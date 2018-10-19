const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const checkAuth = require("../middleware/check-auth");

const Lit = require("../models/lit");


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
router.get("/:id", checkAuth, (req, res, next) => {
  let options = {
    root: config.ASSETS_DIR,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };

  let fileName = req.params.id + ".pdf";
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
      _id: req.body._id,
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
          uploadTime: addedLit.uploadTime,
        });
    });
});

router.post("/file", checkAuth,
multer({storage: storage}).single("file"),
(req, res, next)=>{
  console.log("file received");
  res.status(201).json({
    message:"File saved"
  });
})


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
  let litId = req.query.id;

  const filePath = path.join(config.ASSETS_DIR, litId+".pdf");
  fs.unlinkSync(filePath);

  Lit.deleteOne({_id:litId}).then(
    result => {
      res.status(200);
    }
  ).catch(
    error => {
      console.log("Error deleting file", error);
    }
  );

});

module.exports = router;
