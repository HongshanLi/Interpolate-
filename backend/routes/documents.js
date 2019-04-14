const express = require("express");
const multer = require("multer");
const sftpStorage = require("multer-sftp");

const path = require("path");
const ip = require("ip");
const client = require('scp2');
const fs = require("fs");
const config = require("../lib/config");
const checkAuth = require("../middleware/check-auth");

const Doc = require("../models/document");
const Act = require("../models/activity");
const mongoose = require("mongoose");

const router = express.Router();




//get docs in the entity
router.get("/getEntityDocuments", checkAuth, (req, res, next) =>{

  let match;
  if(req.query.entityType=='my-library'){
    match = {
      entityType: "my-library",
      userId: req.userData.userId
    }
  }else{
    match = {
      entityType: req.query.entityType,
      entityId: req.query.entityId
    }
  }

  const docQuery = Doc.aggregate([
    {
      $match: match
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "uploaderInfo"
      }
    },
    {
      $addFields: {
        uploaderInfo: {$arrayElemAt: ["$uploaderInfo", 0]}
      }
    },
    {
      $addFields:{
        uploaderName: "$uploaderInfo.userName"
      }
    },
    {
      $project: {uploaderInfo : 0, userId: 0}
    }
  ]);

  docQuery.then(
      documents => {
      res.status(200).json({
        message: "docs fetched sucessfully",
        docs: documents
    });
  }).catch(
    error => {
      console.log(error);
    }
  );
});

// return a the pdf file as arrayBuffer
// use id as the identifier

const findDocInfo = (req, res, next)=>{
  console.log(req.query);

  Doc.findOne({_id: req.query._id}).then(
    document => {
      req.docInfo = document;
      next();
    }
  )
}


router.get("/file", findDocInfo,
(req, res, next) => {
  //look up docInfo from docId

  const entityType = req.docInfo.entityType;

  const fileDir = path.join(__dirname, "..", "assets", "pdfDocuments/");

  if(!fs.existsSync(fileDir)){
    fs.mkdirSync(fileDir)
  }
  // check if file exists locally
  const filePath = path.join(fileDir, req.query._id);
  if (!fs.existsSync(filePath)){
    // copy from staging server
    console.log(filePath + " does not exist locally, copying from the remote server")
    const remoteFilePath = path.join('/home/hongshan/Interpolate-/backend/assets/pdfDocuments/',
    req.query._id);

    client.scp({
      host: config.stagingServerIp,
      username: config.stagingServerUsername,
      password: config.stagingServerPassword,
      path: remoteFilePath,
    }, fileDir, (err) => {
      if(!err){
        // send file to user
        sendFileToUser(req, res, fileDir)
      }
    });
  }else{
    sendFileToUser(req, res, fileDir)
  }
});


const sendFileToUser = (req, res, fileDir) =>{
  const options = {
    root: fileDir,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

  let fileName = req.query._id;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
    } else {
      return;
    }
  });
}


router.get("/search", checkAuth, (req, res, next)=>{
  const userId = req.userData.userId;

  Doc.find({
    userId: userId,
    $text: {$search: req.query.queryStr}
  }).then(
    documents => {
      console.log(documents);
      res.status(200).json({
        matchedFiles: documents
      });
    }
  ).catch(
    error => {
      console.log("Error searching files", error);
    }
  );

});



// save the document in the data base
const saveDocInfo = (req, res, next)=>{

  const docInfo = req.body;
  console.log(docInfo);

  const doc = new Doc({
    _id: mongoose.Types.ObjectId(),
    title: docInfo.title,
    authors: docInfo.authors,
    userId: req.userData.userId,
    entityType: docInfo.entityType,
    entityId: docInfo.entityId,
    uploadTime: docInfo.uploadTime,
    threadsCount: 0,
    fileType: docInfo.fileType,
  });

  const key = doc._id;

  if (doc.entityType == 'groups') {
    const act = new Act({
    _id: mongoose.Types.ObjectId(),
    activityType: "DocUpload",
    userId: req.userData.userId,
    date_time: docInfo.uploadTime,
    entityId:docInfo.entityId,
    documentId: key
  });


  act.save()
    .then(
      addedAct => {
        req.docInfo = addedAct;
        next();
      }).catch(
    error =>{
      console.log(error);
    }
  );
}

  doc.save()
    .then(
      addedDoc => {
        res.status(201).json({
          docInfo: addedDoc
        })
      }).catch(
    error => {
      console.log(error);
    }
  );
}

router.post("/saveDocInfo", checkAuth, saveDocInfo,
(req, res, next) => {
  res.status(201).json({
    docInfo: req.docInfo
  });
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const entityType = req.body.entityType;
    let dest = path.join(
      __dirname, "..", "assets", "pdfDocuments");

    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fileId);
  }
});


/*
const storage = sftpStorage({
  sftp:{
    host: '206.189.199.148',
    port: 22,
    username: 'hongshan',
    password: '$$myawesomeapp2018$$'
  },

  destination: function (req, file, cb){
    cb(null, '/home/hongshan/Interpolate-/backend/assets/pdfDocuments')
  },

  filename: function (req, file, cb){
    cb(null, req.body.fileId)
  }
})
*/


router.post("/uploadDoc", checkAuth,
multer({storage: storage}).single("file"),

(req, res, next)=>{
  res.status(201).json({
    message:"File saved"
  });

  // copy the file to the staging server
  if (config.env==-"dev"){
    const filePath = path.join(__dirname, "..", "assets", "pdfDocument", req.fileId)
    client.scp(filePath, {
      host: config.stagingServerIp,
      username: config.stagingServerUsername,
      password: config.stagingServerPassword,
      path: "/home/hongshan/Interpolate-/backend/assets/pdfDocuments"
    }, function(err){
      if(err){
        console.log(err);
      }
    })
  }
});

router.put("/updateDoc", checkAuth, (req, res, next)=>{
  console.log("updating document", req.body);

  Doc.updateOne({_id: req.body._id}, {
    $set: {
      title: req.body.title,
      authors: req.body.authors? req.body.authors:null,
    }

  })
  .then(
    result => {
      console.log(result);
      res.status(200).json({
        message: "doc updated"
      });
    }
  ).catch(
    error => {
      console.log("error updating doc", error);
    }
  );
})


router.delete("/deleteDoc", checkAuth, (req, res, next)=>{
  const _id = req.query._id;
  const entityType = req.query.entityType;



  let filePath;
  if(entityType==="my-library"){
    filePath = path.join(config.ASSETS_DIR, _id);
  }

  if(entityType==="groups"){
    filePath = path.join(config.GROUPASSETS_DIR, _id);
  }

  if(entityType==="classes"){
    filePath = path.join(config.CLASSASSETS_DIR, _id);
  }


  Doc.deleteOne({_id: _id}).then(
    result => {
      try{
        fs.unlinkSync(filePath);
      }catch (err) {
        console.log("error deleting file", err);
      }
      res.status(200).json({
        message: "file deleted"
      });
    }
  ).catch(
    error => {
      console.log("Error deleting file", error);
    }
  );
});


// copy to group
router.post("/copyToGroup", checkAuth, (req, res, next)=>{
  const source = path.join(
    config.ASSETS_DIR, req.body.docId + ".pdf");
  const target = path.join(
    config.GROUPASSETS_DIR, req.body.groupDocId + ".pdf");

  try {
    var stream = fs.createReadStream(source)

  }catch (err){
    console.log("Error reading file", err);
    res.status(500).json({
      message: "Error reading file"
    });
  }

  try {
    stream.pipe(fs.createWriteStream(target));

    res.status(201).json({
      message: "file copied"
    });
  }catch(err){
    console.log("error writing file", err);
    res.status(500).json({
      message: "Error writing file"
    })
  }
});



module.exports = router;
