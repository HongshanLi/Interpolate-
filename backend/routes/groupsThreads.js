const express = require("express");
const multer = require("multer");
const Thread = require("../models/groupThread");
const authCheck = require("../middleware/check-auth");
const helpers = require("../lib/helpers");
const UserFollows = require("../models/userFollows")
const router = express.Router();

// Path here needs to be relative,
// relative to /api/threads

const createTag = (req, res, next) => {
  const data = req.body;
  const tag = data.title.toUpperCase() + " "
  + data.content.toUpperCase();

  req.tag = tag;
  next();
}
router.post("/", authCheck,
  (req, res, next) => {
  const thread = new Thread({
    _id: req.body._id,
    groupId: req.body.groupId,
    commentor: req.body.commentor,
    editorName: req.body.editorName,
    title: req.body.title,
    content: req.body.content,
    litId: req.body.litId,
    litTitle:req.body.litTitle,
    pageNumber: req.body.pageNumber,
    highlightsCoord: req.body.highlightsCoord,
    createTime: req.body.createTime,
    lastEditTime: req.body.lastEditTime,
    responsesCount: 0,
  });
  console.log("new thread", thread);

  helpers.changeThreadsCount(req.body.litId, 1);

  thread.save()
  .then(
    createdThread => {
      res.status(201).json({
        _id: createdThread._id,
        message: "New thread added successfully"
      });
  })
  .catch(
    error => {
      console.log("Error saving thread:", error);
    }
  );
});

// get all threads on the page
// use groupId to filter
router.get("/", authCheck, (req, res, next) =>{
  let litId = req.query.litId;
  let pageNumber = parseInt(req.query.pageNumber, 10);

  Thread.find({
    litId: litId,
    pageNumber: pageNumber
  })
  .then(
    documents => {
      res.status(200).json({
        message: "Threads fetched successfully",
        threads: documents
      });
    }
  )
  .catch(
    error => {
      console.log("Error getting GroupThread", error);
    });

});

//Get threads for one group
router.get("/group", authCheck, (req, res, next)=>{
  Thread.find({groupId:req.query.groupId}).then(
    documents => {
      res.status(200).json({
        message: "Threads for the group fetched successfully",
        threads: documents
      });
    })
    .catch(
      error => {
        console.log("Error finding threads for the group", error);
      }
  );
});

// search a thread

const searchGroupThreads = (req, res, next) => {
  const queryStr = req.query.queryStr.toUpperCase();
  const litId = req.query.litId;

  if(litId!=null){
    Thread.aggregate([
      { $match: { $text: { $search: queryStr}}},
      { $match: {litId: litId}}

    ]).then(
      documents => {
        console.log(documents);

        documents.forEach(document => {
          document.tag = null;
        });

        res.status(200).json({
          threads: documents
        });
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }else{
    Thread.find({$text: {$search: queryStr}}).then(
      documents => {
        documents.forEach(document => {
          document.tag = null;
        });

        res.status(200).json({
          threads: documents
        });
      }
    ).catch(
      error => {
        console.log(error);
      }
    );
  }

}

router.get("/search", authCheck, searchGroupThreads);



//get the number of threads on each lit
/*
router.get("/:litId", authCheck, (req, res, next)=>{
  Thread.find({
    litId: req.params.litId
  })
  .then(
    documents => {
      const threadsCount = documents.length;
      res.status(200).json({
        threadsCount: threadsCount,
      });
  })
  .catch(
    error => {
      console.log("Error finding thread", error);
    }
  );
});
*/

// put
router.put("/", authCheck, (req, res, next)=>{
  let thread = new Thread({
    _id: req.body._id,
    groupId: req.body.groupId,
    commentor: req.body.commentor,
    editorName: req.body.editorName,
    title: req.body.title,
    content: req.body.content,
    litId: req.body.litId,
    pageNumber: req.body.pageNumber,
    highlightsCoord: req.body.highlightsCoord,
    createTime: req.body.createTime,
    lastEditTime: req.body.lastEditTime,
  });

  Thread.updateOne({_id: req.body._id}, thread)
  .then(
    result => {
      res.status(200).json({
        message: "Thread updated successfully"
      });
    }
  )
  .catch(
    err => {
      console.log("Error updating GroupThread:", err);
    }
  );
});



//delete a thread
router.delete("/:threadId/:litId", authCheck, (req, res, next)=>{

  Thread.deleteOne({_id: req.params.threadId})
  .then(result => {
    res.status(200).json({message: "Thread deleted"});
    helpers.changeThreadsCount(req.params.litId, -1);
  })
  .catch(
    error => {
      console.log("Error deleting thread: ", error);
    }
  );
});




module.exports = router;
