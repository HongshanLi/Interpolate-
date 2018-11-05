const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Group = require("../models/group");
const User = require("../models/user");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const shell = require("shelljs");
const fs = require("fs");
const router = express.Router();

const mongoose = require("mongoose");

router.post('', checkAuth, (req, res, next) => {

  const group = new Group({
    _id : mongoose.Types.ObjectId(),
    creatorId: req.body.creatorId,
    groupName: req.body.groupName,
    groupInterests: req.body.groupInterests,
    membersId: req.body.membersId,
  });

  group.save()
  .then(
    result => {
      res.status(200).json({
        groupId: group._id,
        message: "Groups create succesfully",
      });
    }
  )
  .catch(
    error => {
      console.log("Error saving group", error);
      res.status(500).json({
        message: "Failed to save group:" + error
      })
    }
  );
});




router.get('', checkAuth, (req, res, next)=>{
  const userId = req.userData.userId;


  Group.aggregate([
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
    },
    {
      $lookup :
      {
        from :"users",
        localField: "creatorId",
        foreignField: "_id",
        as : "creatorInfo"
      },
    },
    {
      $addFields :
      {creatorInfo: {$arrayElemAt: ["$creatorInfo", 0]}}
    }
  ]).then(
    documents => {
      res.status(200).json({
        message: "Groups fetched successfully",
        groups: documents
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


router.put("", checkAuth, (req, res, next) => {
  Group.updateOne({_id: req.body._id}, req.body).then(
    result => {
      res.status(201).json({
        message: "group update successful"
      });
    }
  ).catch(
    error => {
      console.log("Error updating group", error);
    }
  );
})

//get one group to join
router.get("/getOneGroup", (req, res, next)=>{
  Group.findOne({_id: req.query.groupId}).then(
    document => {
      res.status(200).json({
        group: document
      });
    }
  ).catch(
    error => {
      console.log("Error finding group to join", group)
    }
  );
})




// seach group
// search users
const searchGroups = function(req, res, next){
  //search by name
  const queryStr = req.query.queryStr;
  Group.find({$text: {$search: queryStr}}).then(
    documents =>{
      req.results = documents;
      next();
    }
  );
}

router.get("/query", checkAuth, searchGroups, (req, res, next) => {
  res.status(200).json({
    results: req.results,
  });
});



//router.put("", checkAuth, updateGroup)


//invite people

router.post("/invite", checkAuth, (req, res, next)=>{
  User.findOne({_id: req.userData.userId}).then(
    document => {
      fs.readFile(
        __dirname+"/../templates/invitationEmail.html",
        'utf8',
        (err, data)=>{
          if (err) throw err;
          let email = data.replace("InviteeFirstName", req.body.fullName)
          .replace(/groupName/g, req.body.groupName)
          .replace("InvitorFirstName", document.firstName)
          .replace("InvitorEmail", document.email)
          .replace("signUpLink", config.serverUrl + "/signup/" + req.body.groupId);

          shell.exec(`echo '${email}' | mail -a 'Content-type: text/html' -s "Invitation" ${req.body.email}`);

          res.status(200).json({
            message: "success"
          });
          return;
        });
    }
  ).catch(
    error => {
      console.log("Error finding invitor info", error);
    }
  );

  /*
  const message = "<html><p>You are invited to join";
  shell.exec(`echo '${message}' | mail -a 'Content-type: text/html' -s "Invitation" ${req.body.email}`);
  */

});

module.exports = router;
