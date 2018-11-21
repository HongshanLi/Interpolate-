const express = require("express");
const multer = require("multer");
const Annotation = require("../models/annotation");
const authCheck = require("../middleware/check-auth");
const mongoose = require("mongoose");

const router = express.Router();

// Path here needs to be relative,
// relative to /api/threads

const updateDependeny = (req, res, next)=> {
  // if the incoming annotation has parent
  // either add / remove the incoming
  // ann from its children

  if(req.method=="POST"){

    // update parent
    let annQuery;
    if(req.newAnn.parent == 'root'){
      return;

    }else {
      annQuery = Annotation.findOne({_id: req.newAnn.parent});
    }


    annQuery.then(
      annotation => {
        annotation.children.push(req.newAnn._id)
        Annotation.updateOne({_id: annotation._id}, annotation)
        .then(
          result => {
            return;
          }
        )
      }
    ).catch(
      error => {
        console.log("error")
      }
    )
  }

  if(req.method=="DELETE"){

    let annQuery;
    if(req.query.parent=="root"){
      return;
    }else{
      annQuery = Annotation.findOne({
        _id: req.query.parent
      })
    }
    Annotation.findOne({_id: req.query.parent})
    .then(
      annotation => {
        annotation.children = annotation.children.filter(
          id => id != req.query._id)

        Annotation.updateOne({_id: annotation._id}, annotation)
        .then(
          result => {
            return;
          }
        )
      }
    )
  }


}


const getPipeLines = (match, req) => {

  return Annotation.aggregate([
      {
        $match: match
      },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creatorInfo"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "editorId",
          foreignField: "_id",
          as: "editorInfo"
        }
      },
      {
        $addFields: {
          creatorInfo: {$arrayElemAt: ["$creatorInfo", 0]},
          editorInfo: {$arrayElemAt: ["$editorInfo", 0]}
        }
      },
      {
        $addFields: {
          creatorName: "$creatorInfo.userName",
          editorName: "$editorInfo.userName",

          // user can delte if user is the creator
          // and currend node has no dependents
          isOwner: {
            $cond : [
              {$eq: [req.userData.userId, "$creatorId"]},
              true, false
            ]
          }
        }
      },
      {
        $project : {creatorInfo:0, editorInfo:0, creatorId:0, editorId:0}
      },
    ]);
}

const countItems = (match) => {
  return Annotations.aggregate([
    {
      $match: match
    }
  ])
}


router.post("/createAnnotation", authCheck,
  (req, res, next) => {

  let newAnn = req.body;

  const annotation = new Annotation({
    _id: mongoose.Types.ObjectId(),
    entityType:newAnn.entityType,
    entityId: newAnn.entityId,
    documentId: newAnn.documentId,
    creatorId: req.userData.userId,
    title: newAnn.title,
    content: newAnn.content,
    editorId: newAnn.editorId,
    page: newAnn.page,
    highlightsCoord: newAnn.highlightsCoord,
    createTime: newAnn.createTime,
    lastEditTime: newAnn.lastEditTime,
    followedBy: [],
    viewedBy: newAnn.viewedBy,
    parent: newAnn.parent,
    children: [],
  });

  annotation.save()
  .then(
     newAnn => {
       console.log(newAnn);
      res.status(201).json({
        _id: newAnn._id,
      });

      if(newAnn.parent==null){
        return;
      }else{
        req.newAnn = newAnn;
        next();
      }
  })
  .catch(
    error => {
      console.log("Error saving thread:", error);
    }
  );
}, updateDependeny);


router.get("/getAnnotations", authCheck, (req, res, next)=>{

  let match;

  if(req.query.entityType=="my-library"){
    match = {
      entityType: "my-library",
      creatorId: req.userData.userId,
    }
  }else{
    match = {
      entityType: req.query.entityType,
      entityId: req.query.entityId,
    }
  }

  if(req.query.filterName!="undefined"){
    match.filterName = req.query.filterValue;
  }



  let annQuery = getPipelines(match, req);

  // add pagination;

  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;

  if(pageSize && currentPage){
    annQuery
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  }


  let fetchedAnns;
  annQuery.then(
    annotations => {
      fetchedAnns = annotations;
      return countItem(match).count();
  }).then(
    count => {
      res.status(200).json({
        annotations: fetchedAnns,
        totalAnns: count
      });
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
});


router.get("/setBranch", authCheck, (req, res, next)=>{
  const matchChildren = {
    entityType: req.query.entityType,
    entityId: req.query.entityId,
    parent: req.query.parent
  }

  const matchParent = {
    entityType: req.query.entityType,
    entityId: req.query.entityId,
    _id: req.query._id
  }

  const annQuery = getPipelines(matchChildren, req);

  let branch;
  annQuery.then(annotations => {
    branch = annotation;
    return getPipelines(matchParent, req);
  }).then(annotations =>{
    const parent = annotations[0];
    branch.unshift(parent);
    res.status(200).json({
      branch: branch
    });
  })
  .catch(
    error => {
      console.log(error);
    }
  );

})


router.put("/updateAnnotation", authCheck, (req, res, next) => {
  req.body.editorId = req.userData.userId;
  // only update certain fields so as not to remove creatorId

  // do not allow update of highlightCoord
  Annotation.updateOne({_id: req.body._id},
  {
    $set: {
      "title": req.body.title,
      "content": req.body.content,
      "editorId": req.body.editorId,
      "lastEditTime": req.body.lastEditTime,
    }
  }).then(
    result => {
      res.status(200).json({
        message: "annotation updated"
      })
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
});

router.delete("/deleteAnnotation", authCheck,
(req, res, next)=> {
  // check if user can delete


  Annotation.deleteOne({_id: req.query._id}).then(
    result =>{
      res.status(200).json({
        message: "annotation deleted"
      });

      if(req.query.parent=='root'){
        console.log("root annotation");
        return;
      }else{
        next();
      }
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}, updateDependeny)



module.exports = router;
