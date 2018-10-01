const express = require("express");
const authCheck = require("../middleware/check-auth");
const UserFollows = require("../models/userFollows");
const GroupThread = require("../models/groupThread");
const router = express.Router();





// following a thread
const createUserFollowSchema = (req, res, next) =>{
  const userFollows = new UserFollows({
    _id: req.userData.userId,
    groupThreads: [req.body.threadId],
    groups: [],
  });
  userFollows.save().then(
    result=>{
      res.status(201).json({
        message: "thread followed",
      });
      return;
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

const followThisThread = (req, res, next) => {
  UserFollows.findOne({_id: req.userData.userId}).then(
    follows => {
      if(follows==null){
        createUserFollowSchema(req, res, next);
      }else{
        follows.groupThreads.push(req.body.threadId);
        follows.groupThreads = Array.from(new Set(follows.groupThreads));
        UserFollows.updateOne({_id: req.userData.userId}, follows).then(
          results =>{
            res.status(201).json({
              message: "thread followed",
            });
          }
        ).catch(
          error =>{
            console.log(error);
          }
        );
      }
    }).catch(
      error =>{
        console.log(error);
      }
    );
}

router.put("/groupThreads", authCheck, followThisThread);


//unfollow a group thread
const unfollowThisThread = (req, res, next) => {
  UserFollows.findOne({_id: req.userData.userId}).then(
    follows => {
      const index = follows.groupThreads.indexOf(req.body.threadId);
      follows.groupThreads.splice(index);
      UserFollows.updateOne({_id: req.userData.userId}, follows).then(
        result => {
          res.status(201).json({
            message: "thread unfollowed"
          });
        }
      ).catch(
        error => {
          console.log(error);
        }
      );
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

router.put("/groupThreads/unfollow", authCheck, unfollowThisThread);


// get following threads
const getFollowingThreadsId = (req, res, next) => {
  UserFollows.findOne({_id: req.userData.userId}).then(
    follows => {
      req.followingThreadsId = follows.groupThreads;
      next();
    }
  ).catch(
    error =>{
      console.log(error);
    }
  );
}

const findGroupThreads = (req, res, next) => {
  GroupThread.find({_id: req.followingThreadsId}).then(
    documents => {
      res.status(200).json({
        followingThreads: documents
      });
    }
  ).catch(
    error => {
      console.log(error);
    }
  )
}
router.get("/groupThreads", authCheck, getFollowingThreadsId, findGroupThreads);


module.exports = router;
