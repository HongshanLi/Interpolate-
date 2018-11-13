const express = require("express");
const multer = require("multer");
const Thread = require("../models/groupThread");
const authCheck = require("../middleware/check-auth");
const helpers = require("../lib/helpers");
const mongoose = require("mongoose");

const router = express.Router();

// Path here needs to be relative,
// relative to /api/threads

router.post("/", authCheck,
  (req, res, next) => {
  const thread = new Thread({
    _id: mongoose.Types.ObjectId(),
    groupId: req.body.groupId,
    creatorName: req.body.creatorName,
    creatorId: req.body.creatorId,
    editorName: req.body.editorName,
    editorId: req.body.editorId,
    title: req.body.title,
    content: req.body.content,
    litId: req.body.litId,
    litTitle:req.body.litTitle,
    pageNumber: req.body.pageNumber,
    highlightsCoord: req.body.highlightsCoord,
    createTime: req.body.createTime,
    lastEditTime: req.body.lastEditTime,
    followedBy: [],
    viewedBy: req.body.viewedBy,
    responsesCount: 0,
  });

  helpers.changeThreadsCount(req.body.litId, 1);

  thread.save()
  .then(
    createdThread => {
      res.status(201).json({
        threadId: createdThread._id,
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
  const litId = req.query.litId;
  const pageNumber = +req.query.pageNumber;

  // for paginator (page below refers to page for threads paginator)
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  const threadQuery =  Thread.aggregate([
      {$match: {litId: litId, pageNumber: pageNumber}},
  ]);

  let fetchedThreads;
  if(pageSize && currentPage){
    threadQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }

  threadQuery.then(
    documents => {
      fetchedThreads = documents;
      return Thread.find({litId:litId, pageNumber:pageNumber}).count();
    }
  ).then(
    count => {
      res.status(200).json({
        message: "Threads fetched successfully",
        threads: fetchedThreads,
        totalThreads: count
      });
    }
  ).catch(
    error => {
      console.log("Error gettting groupthreads", error);
    }
  );
});


//Get one thread by id
router.get("/getOneThread", authCheck, (req, res, next)=>{
  Thread.find({_id: req.query.threadId}).then(
    document => {
      res.status(200).json({
        thread: document
      });
    }
  ).catch(
    error => {
      console.log("Error finding a single thread", error);
    }
  );
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
const searchInDoc = (req, res, next) => {
  // Search can be within group or specific lit
  const queryStr = req.query.queryStr;
  const litId = req.query.litId;
  const groupId = req.query.groupId;

  Thread.find({groupId: groupId, litId:litId, $text: {$search: queryStr}})
  .then(
    documents => {
      res.status(200).json({
        matchedThreads: documents
      });
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

router.get("/searchInDoc", authCheck, searchInDoc);


//search in a group
const searchInGroup = (req, res, next) => {
  const queryStr = req.query.queryStr;
  const groupId = req.query.groupId;

  Thread.aggregate([
    { $match: {groupId: groupId, $text: {$search: queryStr}}}
  ])
  .then(
    documents => {
      res.status(200).json({
        matchedThreads: documents
      });
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

router.get("/searchInGroup", authCheck, searchInGroup);


// put
router.put("/", authCheck, (req, res, next)=>{
  /*
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
  */

  Thread.updateOne({_id: req.body._id}, req.body)
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


router.put("/follow", authCheck, (req, res, next)=>{
  if(req.body.following===true){
    Thread.findOne({_id: req.body.threadId}).then(
      document => {
        document.followedBy.push(req.userData.userId);
        console.log(document);
        Thread.updateOne({_id: req.body.threadId}, document).then(
          result => {
            res.status(201);
          }
        );
      }
    ).catch(
      error => {
        console.log("Error updating followedBy", error);
      }
    );
  } else {
    Thread.findOne({_id: req.body.threadId}).then(
      document => {
        document.followedBy = document.followedBy.filter(
          userId => userId != req.userData.userId
        );
        console.log(document);

        Thread.updateOne({_id: req.body.threadId}, document).then(
          result => {
            res.status(201);
          }
        );
      }
    ).catch(
      error => {
        console.log("Error updating followedBy", error);
      }
    );
  }
})

//addUserToViewedBy
//add user to viewd by
router.put("/addUserToViewedBy", authCheck, (req, res, next) => {
  Thread.updateOne(
    {_id: req.body.threadId},
    {$addToSet: {viewedBy: req.userData.userId}}
  ).then(
    result => {
      res.status(201);
    }
  ).catch(
    error => {
      console.log("Error appending viewedBy", error);
    }
  );
});


router.put("/removeUserFromViewedBy", authCheck, (req, res, next) => {
  Thread.updateOne(
    {_id: req.body.threadId},
    {$pull: { viewedBy: req.userData.userId}}
  ).then(
    result => {
      res.status(200);
    }
  ).catch(
    error => {
      console.log("Error pulling out user from viewedBy", error)
    }
  );
});



//delete a thread
router.delete("", authCheck, (req, res, next)=>{
  Thread.deleteOne({_id: req.query.threadId})
  .then(result => {
    res.status(200).json({message: "Thread deleted"});
    helpers.changeThreadsCount(req.query.litId, -1);
  })
  .catch(
    error => {
      console.log("Error deleting thread: ", error);
    }
  );
});




module.exports = router;
