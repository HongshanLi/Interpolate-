const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Class = require("../models/class");
const Lit = require("../models/lit");

const User = require("../models/user");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const shell = require("shelljs");
const fs = require("fs");
const router = express.Router();

const mongoose = require("mongoose");

router.post('', checkAuth, (req, res, next) => {

  const entity = new Class({
    _id : mongoose.Types.ObjectId(),
    creatorId: req.body.creatorId,
    className: req.body.className,
    description: req.body.description,
    membersId: req.body.membersId,
  });

  entity.save()
  .then(
    result => {
      res.status(200).json({
        classId: entity._id,
        message: "Classs create succesfully",
      });
    }
  )
  .catch(
    error => {
      console.log("Error saving class", error);
      res.status(500).json({
        message: "Failed to save class:" + error
      })
    }
  );
});


router.get('', checkAuth, (req, res, next)=>{
  const userId = req.userData.userId;

  console.log("hello",userId);

  Class.aggregate([
    {
      $match : {membersId: userId}
    },
    {
      $lookup :
      {
        from: "users",
        localField: "membersId",
        foreignField: "_id",
        as: "membersInfo"
      }
    }
  ]).then(
    documents => {
      console.log(documents);
      res.status(200).json({
        message: "Classs fetched successfully",
        classes: documents
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

//get one class to join
router.get("/getOneClass", (req, res, next)=>{

  Class.aggregate([
    {
      $match : {_id: req.query.classId}
    },
    {
      $lookup :
      {
        from: "users",
        localField: "membersId",
        foreignField: "_id",
        as: "membersInfo"
      }
    }
  ]).then(
    documents => {
      res.status(200).json({
        message: "Classs fetched successfully",
        class: documents[0]
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

module.exports = router;
