const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Activity = require("../models/activity");

const router = express.Router();
const activityType = [];
const userId = [];
const documentID = [];
const date_time = [];
// const activity_type = [];
// const userArray =[];
// const activity = [];


const findActivityType = function (req, res, next) {
  Activity.find().then(activityArray=>{

    for (let i = 0; i <activityArray.length ; i++) {
      console.log(activityArray[i].activityType);
      activityType[i] = activityArray[i].activityType;
      userId[i] = activityArray[i].userId;
      documentID[i] = activityArray[i].documentId;
      date_time[i] = activityArray[i].date_time;
    }
  })
  res.status(200).json({
    activityType_past:activityType,
    userId_past:userId,
    documentID_past:documentID,
    date_time_past:date_time
  })

}



router.get('/findActivityType',findActivityType);
// router.get('/checkActivity',checkActivity());

module.exports = router;
