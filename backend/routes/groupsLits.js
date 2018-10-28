const express = require("express");


const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const checkAuth = require("../middleware/check-auth");

const Group = require("../models/group");
const Lit = require("../models/groupLit");
const mongoose = require("mongoose");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.GROUPASSETS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, req.body.litId+'.pdf');
  }
});

//get lits for the group
// get all lit info
router.get("/", checkAuth, (req, res, next) =>{
  const groupId = req.query.groupId;
  Lit.find({groupId: groupId}).then(documents => {
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
    root: config.GROUPASSETS_DIR,
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


//save file
router.post("/file", checkAuth, multer({storage:storage}).single("file"),
(req, res, next)=>{
  res.status(201).json({
    message:"file saved"
  });
});


router.post("/", checkAuth,
  (req, res, next) => {
    const lit = new Lit({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      authors: req.body.authors,
      userName:req.body.userName,
      userId: req.body.userId,
      groupId: req.body.groupId,
      uploadTime: Date.now(),
      threadsCount: 0,
    });

    // save the title and author in the database
    lit.save()
    .then(
      addedLit => {
        // send the response
        res.status(201).json({
          message: req.body.title + " by " + req.body.authors + " succesfully to your Bookshelf.",
          litId: lit._id
        });
    });
});


router.post("/addLitFromMyLibrary", checkAuth, (req, res, next) => {
  const source = path.join(
    config.ASSETS_DIR, req.body._id + ".pdf"
  );

  const lit = new Lit({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    authors: req.body.authors,
    userName:req.body.userName,
    userId: req.body.userId,
    groupId: req.body.groupId,
    uploadTime: Date.now(),
    threadsCount: 0,
  });

  const target = path.join(
    config.GROUPASSETS_DIR, lit._id + ".pdf"
  );

  try{
    var stream = fs.createReadStream(source)
  } catch (err){
    console.log("Error reading file", err);
    res.status(500).json({
      message: "Error reading file" + err,
    });
  }

  try{
    stream.pipe(fs.createWriteStream(target));



    lit.save().then(
      addLit => {
        res.status(201).json({
          message: "document successfully added to the group",
          litId: lit._id
        });
      }
    ).catch(
      error => {
        console.log("Error adding doc to group", error);
      }
    );

  }catch(err){
    console.log("Error writing file", error);
  }
});

// put
// the same document (you don't want user A to change lit info of user B)
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

const checkCanDelete = (req, res, next) => {

}

router.delete("/", checkAuth, (req, res, next)=>{
  let litId = req.query.litId;
  const filePath = path.join(config.GROUPASSETS_DIR, litId+".pdf");

  Lit.deleteOne({_id: litId}).then(
    result => {

      try{
        fs.unlinkSync(filePath);
      }catch(err){
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
