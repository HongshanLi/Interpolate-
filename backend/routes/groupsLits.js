const express = require("express");


const multer = require("multer");
const path = require("path");
const fs = require("fs");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const checkAuth = require("../middleware/check-auth");

const Group = require("../models/group");
const Lit = require("../models/groupLit");


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.GROUPASSETS_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, req.body._id+'.pdf');
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
  console.log("preparing sending file");
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
      console.log('Sent:', fileName);
    }
  });
});


/*
const streamToDisk = busboy({
  highWaterMark: 2 * 1024 * 1024,
  filename: (req, file, cb) => {
    cb(null, req.body._id+'.pdf');
  }
});

const uploadPath = path.join(__dirname, '/../assets/group');
router.post("/", checkAuth, streamToDisk, (req, res, next)=>{
  req.pipe(req.busboy);

  req.busboy.on('file', (fieldName, file, fileName)=>{
    console.log(`upload of '${fileName}' started`);
    const fstream = fs.createWriteStream(path.join(uploadPath, fileName));
    file.pipe(fstream);

    fstream.on('close', () => {
      console.log(`Upload of '${filename}' finished`);
      res.redirect('back');
    });
  });
  console.log("lit info", req.body);
  const lit = new Lit({
    _id: req.body._id,
    title: req.body.title,
    authors: req.body.authors,
    litId: req.body.litId,
    userName: req.body.userName,
    groupId: req.body.groupId,
    uploadTime: Date.now(),
    threadsCount: 0,
  });

  // save the title and author in the database
  lit.save()
  .then(
    addedLit => {
      console.log("saved id", addedLit._id);
      // send the response
      res.status(201).json({
        message: req.body.title + " by " + req.body.authors + " succesfully to your Bookshelf.",
        uploadTime: addedLit.uploadTime,
      });
    });
});
*/


router.post("/", checkAuth, multer({storage:storage}).single("file"),
  (req, res, next) => {

    console.log("lit info", req.body);
    const lit = new Lit({
      _id: req.body._id,
      title: req.body.title,
      authors: req.body.authors,
      litId: req.body.litId,
      userName: req.body.userName,
      groupId: req.body.groupId,
      uploadTime: Date.now(),
      threadsCount: 0,
    });

    // save the title and author in the database
    lit.save()
    .then(
      addedLit => {
        console.log("saved id", addedLit._id);
        // send the response
        res.status(201).json({
          message: req.body.title + " by " + req.body.authors + " succesfully to your Bookshelf.",
          uploadTime: addedLit.uploadTime,
        });
    });
});



// put
// the same document (you don't want user A to change lit info of user B)
router.put("/", checkAuth, (req, res, next)=>{


  const lit = new Lit({
    _id: req.body._id,
    title: req.body.title,
    authors: req.body.authors,
    userName: req.body.userName,
    groupId: req.body.groupId,
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
router.delete("/:id", checkAuth, (req, res, next)=>{
  let litId = req.params.id;
  let userName = req.query.userName;

  // check if the person deleting the file is one uploading it
  Lit.findOne({_id: litId})
  .then(
    document => {
      if(document.userName === userName ){
        //helpers.deleteFile(groupDir, litId+".pdf");
        let filePath = path.join(config.GROUPASSETS_DIR, litId+".pdf");
        // delete file sync
        try{

          Lit.deleteOne({_id: litId })
          .then(
              result => {
                res.status(200).json(
                {message: litId + " successfully deleted"}
            );
          });
          fs.unlinkSync(filePath);
        } catch (err){
          // @TODO log the error
          console.log(err);
          res.status(500).json(
            {message: "Error deleting the file"}
          );
        }
      }
      else {
        res.status(401).json(
          {message: "You can only delete files you uploaded"}
        );
      }
    }
  );
});

module.exports = router;
