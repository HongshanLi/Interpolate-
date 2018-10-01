const express = require("express");
const multer = require("multer");
const Thread = require("../models/thread");
const authCheck = require("../middleware/check-auth");

const router = express.Router();

// Path here needs to be relative,
// relative to /api/threads
router.post("/", authCheck,
  (req, res, next) => {

  const thread = new Thread({
    commentor: req.body.commentor,
    title: req.body.title,
    content: req.body.content,
    litId: req.body.litId,
    pageNumber: req.body.pageNumber
  });

  console.log(thread);
  thread.save().then(
    createdThread => {
      res.status(201).json({
        message: "New thread added successfully",
        _id: createdThread._id
      });
  });
});

// get all threads on the page
router.get("/", authCheck, (req, res, next) =>{
  let litId = req.query.litId;
  let pageNumber = req.query.pageNumber;

  Thread.find({
    litId: litId,
    pageNumber: pageNumber
  })
  .then(
    documents => {
      console.log("found", documents);
      res.status(200).json({
        message: "Threads fetched successfully",
        threads: documents
      });
    }
  )
  .catch(
    error => {
      console.log(error);
    });
});

// get one thread to be updated
router.get("/:id", authCheck, (req, res, next)=>{
  Thread.find({
    _id: req.params.id
  })
  .then(
    documents => {
      res.status(200).json({
        message: "Thread fetched successfully",
        thread: documents[0]
      });
  })
  .catch(
    error => {
      console.log("Error finding thread", error);
    }
  );
});

// put
router.put("/", authCheck, (req, res, next)=>{
  let thread = new Thread({
    _id: req.body._id,
    commentor: req.body.commentor,
    title: req.body.title,
    content: req.body.content,
    litId: req.body.litId,
    pageNumber: req.body.pageNumber
  });

  console.log("updated thread", thread);

  Thread.updateOne({_id: req.body._id}, thread)
  .then(
    result => {
      res.status(200).json({
        message: "Thread updated successfully"
      });
    }
  );
});


router.delete("/:id", authCheck, (req, res, next)=>{

  Thread.deleteOne({_id: req.params.id}).then(result => {
    res.status(200).json({message: "Thread deleted"});
  });
});

module.exports = router;
