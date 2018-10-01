const express = require("express");
const Response = require("../models/groupResponse");
const authCheck = require("../middleware/check-auth");
const helpers = require("../lib/helpers");
const router = express.Router();
const resCountIncrement = require("../middleware/incrementResponsesCount")
const Thread = require("../models/groupThread");
// post
router.post("/", authCheck, (req, res, next) => {
  const response = new Response({
    _id: req.body._id,
    threadId: req.body.threadId,
    groupId: req.body.groupId,
    creatorName: req.body.creatorName,
    editorName: req.body.editorName,
    responseContent: req.body.responseContent,
    createTime: req.body.createTime,
    lastEditTime: req.body.lastEditTime,
  });
  console.log("new response", response);

  helpers.changeResponsesCount(req.body.threadId, increment=1);


  response.save()
  .then(
    addedResponse => {
      res.status(201).json({
        message: "Response to " + req.body.threadId + " saved successfully",
        //response: addedResponse
      });
    }
  )
  .catch(
    err => {
      console.log(err);
    }
  );
});

// get all responses for one thread
// arg: threadId
router.get("/", authCheck, (req, res, next)=>{
  let threadId = req.query.threadId;
  Response.find({threadId: threadId})
  .then(
    documents => {
      res.status(200).json({
        message: "Response to " + threadId + " fetched successfully",
        responses: documents
      });
    }
  )
  .catch(
    err => {
      console.log("Error getting responses", err);
    }
  );
});


//get all responses for one group
router.get("/group", authCheck, (req, res, next)=> {
  Response.find({groupId: req.query.groupId})
  .then(
    documents => {
      res.status(200).json({
        message: "Responses for the group fetched successfully",
        responses: documents
      });
    }
  ).catch(
    error => {
      res.status(500);
      console.log("Error finding responses", error);
    }
  );
});


//get one response to update
/*
router.get("/:responseId", authCheck, (req, res, next) => {
  let responseId = req.params.responseId;

  Response.findOne({_id: responseId})
  .then(
    document => {
      console.log("updated response:", document);
      res.status(200).json({
        message: "response " + responseId + " fetched successfully",
        response: document
      });
    }
  )
  .catch(
    error => {
      console.log("Error finding response " + responseId, error);
    }
  );
});
*/

//put
router.put("/", authCheck, (req, res, next) => {
  Response.updateOne({_id: req.body._id}, req.body)
  .then(
    result => {
      console.log("updated response", result);
      res.status(200).json({
        updatedResponse: req.body,
        message: "response" + req.body._id + " updated successfully"
      });
    }
  )
  .catch(
    error => {
      console.log("Error updating response " + req.body._id, error);
    }
  );
});

// delete
router.delete("/:responseId/:threadId", authCheck, (req, res, next) => {

  Response.deleteOne({_id: req.params.responseId})
  .then(
    result => {
      res.status(200).json({
        message: "response" + req.params.responseId + " deleted successfully"
      });
      helpers.changeResponsesCount(req.params.threadId, increment=-1);
    }
  )
  .catch(
    error => {
      console.log("Error deleting response " + req.params.responseId, error);
    }
  );
})



module.exports = router;
