const express = require("express");
const Lit = require("../models/lit");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helpers = require("../lib/helpers");
const checkAuth = require("../middleware/check-auth");
const config = require("../lib/config");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.ASSETS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, req.body._id+".pdf");
  }
});


router.post("", checkAuth, multer({storage:storage}).single("file"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const lit = new Lit({
      _id: req.body._id,
      title: req.body.title,
      authors: req.body.authors,
      litId: req.body.litId,
      userName: req.body.userName,
    });

    lit.save()
    .then(
      addedLit => {
        // send the response
        res.status(201).json({
          message: req.body.title + " by " +
          req.body.authors + " succesfully to your Bookshelf.",
          _id: addedLit._id
        });
    });
});

// get all lit info
router.get("/", checkAuth, (req, res, next) =>{
  const userName = req.query.userName;
  Lit.find({userId: userName}).then(documents => {
    res.status(200).json({
      message: "lits fetched sucessfully",
      lits: documents
    });
  });
});


// return a the pdf file as arrayBuffer
// use id as the identifier
router.get("/:id", checkAuth, (req, res, next) => {
  console.log("preparing sending file");
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
      console.log('Sent:', fileName);
    }
  });
});


// put
router.put("/", checkAuth, (req, res, next)=>{
  console.log("read to update")
  const lit = new Lit({
    _id: req.body._id,
    title: req.body.title,
    authors: req.body.authors,
    userName: req.body.userName,
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
router.delete("/:id", checkAuth, (req, res, next)=>{
  let litId = req.params.id;
  let userId = req.query.userName;
  Lit.deleteOne({_id: litId })
  .then(
    result => {
      // Delete the pdf file
      helpers.deleteFile(config.ASSETS_DIR, litId+".pdf");
      res.status(200).json(
      {message: litId + " successfully deleted"}
    );
  });
});
module.exports = router;
