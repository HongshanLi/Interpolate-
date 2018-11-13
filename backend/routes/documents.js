const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const checkAuth = require("../middleware/check-auth");

const Doc = require("../models/document");
const mongoose = require("mongoose");

const router = express.Router();




//get docs in the entity
router.get("/getEntityDocuments", checkAuth, (req, res, next) =>{
  let entityType = req.query.entityType;
  let entityId;

  if(!req.query.entityId){
    entityId = req.userData.userId;
  }else{
    entityId = req.query.entityId
  }


  Doc.find({
    entityType: entityType,
    entityId: entityId}).then(
      documents => {
        console.log(documents);
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
  Doc.findOne({_id: req.query._id}).then(
    document => {
      req.docInfo = document;
      next();
    }
  )
}

router.get("/file", checkAuth, findDocInfo,
(req, res, next) => {
  //look up docInfo from docId

  const entityType = req.docInfo.entityType;

  let fileDir;

  if(entityType==="classes"){
    fileDir = config.CLASSASSETS_DIR;
  }
  if(entityType==="groups"){
    fileDir = config.GROUPASSETS_DIR;
  }
  if(entityType==="libraries"){
    fileDir=config.ASSETS_DIR
  }
  console.log(fileDir);
  console.log(req.query);

  let options = {
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
      next(err);
    } else {
      return;
    }
  });
});




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
  let fileDir;
  let entityId;

  const docInfo = req.body;


  if(docInfo.entityType==="libraries"){
    entityId = req.userData.userId;
  }else{
    entityId = docInfo.entityId
  }

  const doc = new Doc({
    _id: mongoose.Types.ObjectId(),
    title: docInfo.title,
    authors: docInfo.authors,

    userId: req.userData.userId,

    entityType: docInfo.entityType,
    entityId: entityId,
    uploadTime: docInfo.uploadTime,
    threadsCount: 0,
    fileType: docInfo.fileType,
  });


  doc.save()
  .then(
    addedDoc => {
      req.docInfo = addedDoc;
      next();
  }).catch(
    error =>{
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
    let dest;
    if(entityType==="classes"){
      dest = config.CLASSASSETS_DIR;
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.fileId);
  }
});

router.post("/uploadDoc", checkAuth,
multer({storage: storage}).single("file"),
(req, res, next)=>{
  res.status(201).json({
    message:"File saved"
  });
});

router.put("/updateDoc", checkAuth, (req, res, next)=>{
  console.log("heelo", req.body);

  Doc.updateOne({_id: req.body._id}, req.body)
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
  if(entityType==="libraries"){
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
