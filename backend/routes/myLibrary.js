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
    cb(null, req.body.litId+'.pdf');
  }
});


//get lits in the library
router.get("/", checkAuth, (req, res, next) =>{
  const userId = req.query.userId;
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

  let fileName = req.query.litId + ".pdf";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      next(err);
    } else {
      return;
    }
  });
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
// the same document (you don't want user A to change lit info of user B)
router.put("/", checkAuth, (req, res, next)=>{


  const lit = new Lit({
    _id: req.body._id,
    title: req.body.title,
    authors: req.body.authors,
    userName: req.body.userName,
    userId: req.body.userId,
    uploadTime: req.body.uploadTime,
    //@TODO do this step in the backend
    // directly use info from the database
    threadsCount: req.body.threadsCount,
  });

  Lit.updateOne({_id: req.body._id}, lit).then(
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

  const filePath = path.join(config.ASSETS_DIR, litId+".pdf");

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
