const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const checkAuth = require("../middleware/check-auth");

const Lit = require("../models/lit");
const mongoose = require("mongoose");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.ASSETS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.litId+"."+req.body.fileType);
  }
});


//get lits in the library
router.get("/", checkAuth, (req, res, next) =>{
  const userId = req.userData.userId;
  
  Lit.find({userId: userId}).then(documents => {
    res.status(200).json({
      message: "lits fetched sucessfully",
      lits: documents
    });
  });
});

// return a the pdf file as arrayBuffer
// use id as the identifier
router.get("/file", checkAuth, (req, res, next) => {
  let options = {
    root: config.ASSETS_DIR,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

  console.log(req.query);

  let fileName = req.query.litId + "." + req.query.fileType;
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


  Lit.find({
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


router.post("/litInfo", checkAuth,
  (req, res, next) => {

    const lit = new Lit({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      authors: req.body.authors,
      userName: req.body.userName,
      userId: req.body.userId,
      uploadTime: req.body.uploadTime,
      threadsCount: 0,
      fileType:req.body.fileType
    });


    // save the title and author in the database
    lit.save()
    .then(
      addedLit => {
        // send the response
        res.status(201).json({
          message: req.body.title + " by " + req.body.authors + " succesfully to your Bookshelf.",
          litId: lit._id,
        });
    });
});

router.post("/file", checkAuth,
multer({storage: storage}).single("file"),
(req, res, next)=>{
  res.status(201).json({
    message:"File saved"
  });
})

// copy to group
router.post("/copyToGroup", checkAuth, (req, res, next)=>{
  const source = path.join(
    config.ASSETS_DIR, req.body.litId + ".pdf");
  const target = path.join(
    config.GROUPASSETS_DIR, req.body.groupLitId + ".pdf");

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

// put
router.put("/", checkAuth, (req, res, next)=>{

  Lit.updateOne({_id: req.body._id}, req.body).then(
    result => {
      res.status(201).json({
        message: "successfully updated"
      });
    }
  );
});

// delete
// use id instead of litIdentifier, as different users might upload
// the same document (you don't want user A to to delete lit info of user B)
router.delete("/", checkAuth, (req, res, next)=>{
  let litId = req.query.litId;

  const filePath = path.join(config.ASSETS_DIR, litId+"."+req.query.fileType);

  Lit.deleteOne({_id:litId}).then(
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

module.exports = router;
