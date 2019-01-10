const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Class = require("../models/class");
const Group = require("../models/group")

const User = require("../models/user");

const config = require("../lib/config");
const shell = require("shelljs");
const fs = require("fs");
const router = express.Router();

const mongoose = require("mongoose");



router.post('/createClass', checkAuth, (req, res, next) => {
  const entity = new Class({
    _id : mongoose.Types.ObjectId(),
    creatorId: req.userData.userId,
    name: req.body.className,
    description: req.body.description,
    membersId: [req.userData.userId]
  });

  entity.save()
  .then(
    result => {
      res.status(200).json({
        entity:entity
      });
    }
  )
  .catch(
    error => {
      console.log("Error saving entity", error);
      res.status(500).json({
        message: "Failed to save entity:" + error
      })
    }
  );
});

router.post('/createGroup', checkAuth, (req, res, next) => {

  const entity = new Group({
    _id : mongoose.Types.ObjectId(),
    creatorId: req.userData.userId,
    name: req.body.name,
    description: req.body.description,
    membersId: [req.userData.userId]
  });

  entity.save()
  .then(
    result => {
      console.log(result);
      res.status(200).json({
        entity:entity
      });
    }
  )
  .catch(
    error => {
      console.log("Error saving entity", error);
      res.status(500).json({
        message: "Failed to save entity:" + error
      })
    }
  );
});



router.get('/getClasses', checkAuth, (req, res, next)=>{
  const userId = req.userData.userId;

  Class.aggregate([
    {
      $match : {membersId: userId}
    }
  ]).then(
    documents => {
      res.status(200).json({
        entities: documents
      });
    }
  ).catch(
    error => {
      res.status(400).json({
        error: error
      });
    }
  );
});

router.get('/getGroups', checkAuth, (req, res, next)=>{
  const userId = req.userData.userId;
  Group.aggregate([
    {
      $match : {membersId: userId}
    }
  ]).then(
    documents => {
      res.status(200).json({
        entities: documents
      });
    }
  ).catch(
    error => {
      res.status(400).json({
        error: error
      });
    }
  );
});


//get info for one entity
router.get("/getEntityInfo", checkAuth, (req, res, next)=>{


  const aggregatePipeline = [
    {
      $match : {_id: req.query.entityId}
    },
    {
      $lookup :
      {
        from: "users",
        localField: "membersId",
        foreignField: "_id",
        as: "membersInfo"
      }
    },

    {
      $addFields: {
        userIsCreator:  {$eq: ["$creatorId", req.userData.userId]},
        members: "$membersInfo.userName"
      }
    },
    {
      $project: {membersInfo: 0}
    }

  ];


  let entityQuery;

  if(req.query.entityType=="classes"){
    entityQuery = Class.aggregate(aggregatePipeline);
  }
  if(req.query.entityType=="groups"){
    entityQuery = Group.aggregate(aggregatePipeline);
  }

  entityQuery.then(
    documents => {
      console.log(documents);
      res.status(200).json({
        message: "Entity fetched successfully",
        entity: documents[0]
      });
    }
  ).catch(
    error => {
      res.status(400).json({
        error: error
      });
    }
  );
});


router.post("/addDocFromLibrary", checkAuth, (req, res, next)=>{
    const source = path.join(
      config.ASSETS_DIR, req.body._id + "." + req.body.fileType
    );

    const lit = new Lit({
      _id: mongoose.Types.ObjectId(),
      title: req.body.title,
      authors: req.body.authors,
      userId: req.body.userId,
      entityType: req.body.entityType,
      entityId: req.body.entityId,
      uploadTime: Date.now(),
      threadsCount: 0,
    });

    const target = path.join(
      config.CLASSASSETS_DIR, lit._id + "." + req.body.fileType
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
            _id: lit._id
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



router.put("", checkAuth, (req, res, next) => {
  Class.updateOne({_id: req.body._id}, req.body).then(
    result => {
      res.status(201).json({
        message: "class update successful"
      });
    }
  ).catch(
    error => {
      console.log("Error updating class", error);
    }
  );
})



module.exports = router;
