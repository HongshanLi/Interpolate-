const express = require("express");
const checkAuth = require("../middleware/check-auth");
const Group = require("../models/group");
const User = require("../models/user");
const helpers = require("../lib/helpers");
const config = require("../lib/config");
const shell = require("shelljs");
const fs = require("fs");
const router = express.Router();


//get all groups created at my school
router.get('/myschool', checkAuth, (req, res, next) => {
    Group.find()
    .then(
      documents => {
        res.status(200).json({
          groups: documents
        }
      );
    })
    .catch(
      error => {
        res.status(400).json({
          error: error
        });
      }
    );
})

router.get('/oneGroup', checkAuth, (req, res, next)=>{
  Group.findOne({_id: req.query.groupId}).then(
    document => {
      res.status(200).json({
        group: document
      });
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
});

router.post('', checkAuth, (req, res, next) => {

  const group = new Group({
    _id : req.body._id,
    creator: req.body.creator,
    groupName: req.body.groupName,
    groupInterests: req.body.groupInterests,
    members: req.body.members,
    pendingMembers: req.body.pendingMembers
  });

  group.save()
  .then(
    result => {
      res.status(200).json({
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
  const userName = req.query.userName;

  Group.find({members: userName})
  .then(
    documents => {
      res.status(200).json({
        message: "Group fetched successfully",
        groups: documents
      }
    );
  })
  .catch(
    error => {
      res.status(400).json({
        error: error
      });
    }
  );
});

// seach group
// search users
const searchGroups = function(req, res, next){
  //search by name
  const queryStr = req.query.queryStr.toUpperCase();
  Group.find({$text: {$search: queryStr}}).then(
    documents =>{
      let results = []
      documents.forEach(document=>{
        document.tag = null;
        results.push(document);
      });
      req.results = results;
      next();
    }
  );
}

router.get("/query", checkAuth, searchGroups, (req, res, next) => {
  res.status(200).json({
    results: req.results,
  });
});



// update group:
// update tag
const updateTag = function(req, res, next){
  const data = req.body;
  const tag = data.groupName.toUpperCase() + " "
  + data.groupInterests.toUpperCase();
  req.body.tag = tag;
  next();
}

const updateGroup = function(req, res, next){
  Group.updateOne({_id: req.body._id}, req.body).then(
    result => {
      res.status(200).json({
        message: "Group info successfully updated!"
      })
    }
  ).catch(
    error => {
      res.status(500).json({
        message: "Failed to updated group info!"
      });

      console.log("Error updating group", error);
    }
  );
}


router.put("", checkAuth, updateTag, updateGroup)

/*
router.delete("/:id", checkAuth, (req, res, next)=>{
  Group.deleteOne({_id: req.params.id}).then(
    result => {
      res.status(200).json({
        message: "Group deleted"
      });
    }
  );
});
*/


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
