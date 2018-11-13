const express = require("express");
const multer = require("multer");
const Annotation = require("../models/annotation");
const authCheck = require("../middleware/check-auth");
const mongoose = require("mongoose");

const router = express.Router();

// Path here needs to be relative,
// relative to /api/threads

const checkDependency = (req, res, next)=> {
  // if the incoming annotation has parent
  // either add / remove the incoming
  // ann from its children
  if(req.body.parent==null){
    next();
  }else{
    if(req.method=="POST"){
      Annotation.findOne({_id: req.body.parent})
      .then(
        annotation => {
          annotation = annotation.children.push(req.newAnn._id)
          Annotation.updateOne({_id: annotation._id}, annotation)
          .then(
            result => {
              return;
            }
          )
        }
      )
    }

    if(req.method=="DELETE"){
      Annotation.findOne({_id: req.body.parent})
      .then(
        annotation => {
          annotation = annotation.children.filter(
            id => id != req.newAnnotation._id)

          Annotation.updateOne({_id: annotation._id}, annotation)
          .then(
            result => {
              next();
            }
          )
        }
      )
    }
  }
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
    title: req.body.title,
    content: req.body.content,
    editorId: req.body.editorId,
    page: req.body.page,
    highlightsCoord: req.body.highlightsCoord,
    createTime: req.body.createTime,
    lastEditTime: req.body.lastEditTime,
    followedBy: [],
    viewedBy: req.body.viewedBy,
    parent: newAnn.parent,
    children: [],
  });

  annotation.save()
  .then(
     newAnn => {
      res.status(201).json({
        _id: newAnn._id,
      });

      req.newAnn = newAnn
      next();
  })
  .catch(
    error => {
      console.log("Error saving thread:", error);
    }
  );
}, checkDependency);


router.get("/getAnnotations", authCheck, (req, res, next)=>{

  console.log(req.query);

  let annQuery;


  /*if(){
    annQuery = Annotation.find({
      parent: req.query.parent
    });

  }else{
    annQuery = Annotation.find({
      documentId: req.query.documentId,
    });
  }*/

  annQuery = Annotation.find({
    entityType: req.query.entityType,
    entityId: req.query.entityId,
    documentId: req.query.documentId !=='undefined'?
      req.query.documentId : {$exists: true},
    parent: req.query.parent !=='undefined'?
      req.query.parent: {$exists: false}
  })

  annQuery.then(annotations => {
    console.log(annotations);
    res.status(200).json({
      annotations: annotations
    });
  }).catch(
    error => {
      console.log(error);
    }
  );
})

module.exports = router;
