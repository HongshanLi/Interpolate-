const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

const Group = require("../models/group");
const Class = require("../models/class");

const checkAuth = require("../middleware/check-auth");
const config = require("../lib/config");
const shell = require("shelljs");
const fs = require("fs");

const router = express.Router();

// Check if a user exists
router.get('', (req, res, next)=>{
  const userName = req.query.userName;
  User.findOne({userName: userName}).then(
    document => {
      if(document){
        res.status(200).json({
          message: "user exists"
        });
      } else {
        res.status(404).json({
          message: "user not found"
        });
      }
    }
  );

});



// fetch userInfo to update
// put a middle to only allow user to fetch their own info
const verifyUserIdentity = function(req, res, next){
  const userId = req.userData.userId;
  User.findOne({_id: req.userData.userId}).then(
    document => {
      if(document.userName === req.query.userName){
        document._id;
        document.password;
        req.userInfo = document;
        next();
      }else{
        console.log("This user does not exist");
        res.status(401);
        return;
      }
    }
  ).catch(
    error=>{
      console.log(error);
    }
  );
}
router.get("/fetchUserInfo", checkAuth, verifyUserIdentity,
  (req, res, next) => {
    res.status(200).json({
    firstName: req.userInfo.firstName,
    lastName: req.userInfo.lastName,
    userName: req.userInfo.userName,
    email: req.userInfo.email,
    affiliation:req.userInfo.affiliation,
  });
});


// Check username and email availability
const checkUserName = (req, res, next) => {
  User.find({userName: req.query.userName}).then(
    users => {
      if(users.length == 0){
        next();
      }else{
        res.status(200).json({
          message: "This username has already been regiestered"
        });

        return;
      }
    }
  );
}

const checkEmail = (req, res, next) => {
  User.find({email: req.query.email}).then(
    users => {


      if(users.length == 0){
        next();
      }else{
        res.status(200).json({
          message: "This email has already been regiestered"
        });
        return;
      }
    }
  )
}

router.get("/checkUserNameAndEmail", checkUserName, checkEmail,
(req, res, next) => {
  res.status(200).json({
    message: "available"
  });
})

// signup
router.post('/signup', (req, res, next)=>{
  // hash the password
  bcrypt.hash(req.body.password, 10)
  .then(hashed => {
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashed,
      affiliation: req.body.affiliation,
    });
    // console.log(user);
    user.save()
    .then(result => {
      res.status(201).json({
        message: "user created",
      });
    })
    .catch(err => {
      console.log("Error Here", err);
      res.status(500).json({
        error: err
      });
    });
  });
});



// login
// find user by username or email
const findUser = function(req, res, next){
  const identity = req.body.identity;
  User.findOne({$or:[{userName: identity},{email: identity}]}).then(
    userInfo =>{
      if(userInfo){
        req.userInfo = userInfo;
        next();
      }else {
        res.status(404).json({
          message: "User not found"
        });
      }
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

const checkPassword = function(req, res, next){
  bcrypt.compare(req.body.password, req.userInfo.password)
  .then(
    result =>{
    if(result){
      console.log("password is okay");
      const token = jwt.sign(
        {
          email: req.userInfo.email,
          userId: req.userInfo._id
        },
        config.JWT_KEY,

        { expiresIn: "1h"}
      );

      req.token = token;
      next();
    }else{
      res.status(401).json({
        message: "auth failed"
      });
      return;
    }
  }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

const sendTokenAndUsername = function(req, res, next){
  res.status(200).json({
    token: req.token,
    expiresIn: 3600*1,
    userName: req.userInfo.userName,
  });
}

router.post('/login', findUser, checkPassword, sendTokenAndUsername);

// renew token
router.get("/renewToken", checkAuth, (req, res, next)=>{
  const token = jwt.sign(
    {
      email: req.userData.email,
      userId: req.userData.userId,
    },
    config.JWT_KEY,
    { expiresIn: "1h"}
    );

    res.status(200).json({
      token: token,
      expiresIn: 3600*1
    });
})


// Login to join an entity
const addUserToEntity = (req, res, next) => {
  //remember to only add user once

  const addUser = {
    $addToSet: {membersId: req.userInfo._id}
  };

  let operation;

  if(req.body.entityType=="classes"){
    operation = Class.findOneAndUpdate(
      {_id: req.body.entityId},
      addUser,
    );
  }
  if(req.body.entityType=="groups"){
    operation = Group.findOneAndUpdate(
      {_id: req.body.entityId},
      addUser,
    );
  }

  operation.then(
    result => {
      next();
    }
  ).catch(
    error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    }
  )

}

router.post("/loginToJoinEntity", findUser, checkPassword,
addUserToEntity,  sendTokenAndUsername);


// user forgets password, request password reset
const findUserByEmail = function(req, res, next){
  User.findOne({email: req.query.email}).then(
    userInfo =>{
      if(userInfo!=null){
        req.userInfo = userInfo;
        next();
      } else{
        res.status(404).json({
          message: req.query.email + " is not a registered email"
        });
        return;
      }
    }
  );
}

const generateTmpPassword = function(req, res, next){

  // Define all the possible characters that could go into a string
  let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789QWERTYUIOPASDFGHJKLZXCVBNM';

  // Start the final string
  let tmpPass = '';
  for(let i = 1; i <= config.tmpPassLength; i++) {
      // Get a random charactert from the possibleCharacters string
      let randomCharacter =
      possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the string
      tmpPass+=randomCharacter;
  }


  bcrypt.hash(tmpPass, 10).then(
    hash => {
      req.userInfo.password = hash;
      req.tmpPassword = tmpPass;
      next();
    }
  ).catch(
    error=>{
      console.log(error);
      return;
    }
  );
}

const updateUserPassword = function(req, res, next){
  User.updateOne({email: req.query.email}, req.userInfo).then(
    result=>{
      next();
    }
  ).catch(
    error =>{
      console.log(error);
      return;
    }
  );
}

const sendTmpPassEmail = function(req, res, next){
  fs.readFile(
    __dirname+"/../templates/tmpPassword.html",
    'utf8',
    (err, data)=>{
      if (err) throw err;

      let email = data.replace("userFirstName", req.userInfo.firstName)
      .replace("currentDate", Date())
      .replace("tmpPass", req.tmpPassword);

      shell.exec(`echo '${email}' | mail -a 'Content-type: text/html' -s "Password Reset Notification" ${req.query.email}`);

      res.status(200).json({
        message: "A temporary password has been sent to your email."
      });
    });
}

router.get('/passwordReset/forgotPassword',
  findUserByEmail, generateTmpPassword, updateUserPassword,
  sendTmpPassEmail);

// user wants to update password when logged in
const findUserByUserName = function(req, rest, next){
  const passData = req.body.passData;
  User.findOne({userName: passData.userName}).then(
    userInfo =>{
      req.userInfo = userInfo;
      next();
    }
  ).catch(
    error => {
      console.log(err)
    }
  );
}

const comparePasswords = function(req, res, next){
  const passData = req.body.passData;
  bcrypt.compare(passData.currentPassword, req.userInfo.password).then(
    passwordIsCorrect =>{
      if(passwordIsCorrect){
        next();
      }else{
        res.status(400).json({
          message: "Current password is incorrect."
        });
        return;
      }
    }
  ).catch(
    error => {
      console.log(error);
    }
  );
}

const updatePassword = function(req, res, next){
  const passData = req.body.passData;
  bcrypt.hash(passData.newPassword, 10).then(
    hash => {
      req.userInfo.password = hash;
      User.updateOne({_id: req.userInfo._id}, req.userInfo).then(
        result=>{
          res.status(200).json({
            message: "Password has been successfully updated!"
          });
          next();
        }
      ).catch(
        error =>{
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

const emailUserForPasswordUpdate = function(req, res, next){
  fs.readFile(
    __dirname+"/../templates/updatePassword.html",
    'utf8',
    (err, data)=>{
      if (err) throw err;

      let email = data.replace("userFirstName", req.userInfo.firstName)
      .replace("currentDate", Date());

      shell.exec(`echo '${email}' | mail -a 'Content-type: text/html' -s "Password Update Notification" ${req.userInfo.email}`);
      next();
    });
}

router.put("/updatePassword", checkAuth, findUserByUserName, comparePasswords,
updatePassword, emailUserForPasswordUpdate);


// update user profile
//check if another user has the same email
const checkEmailAvailability = function(req, res, next){
  User.findOne({email: req.body.email}).then(
    document=> {
      if(document===null || document._id===req.userData.userId){
        next();
      }else {
        res.status(400).json({
          type:"Email duplicated",
          message: "Another user already registered this email."
        });
      }
    }
  ).catch(
    error => {
      console.log("Error finding document", error);
    }
  )
};

//check if another user has the same user name
const checkUserNameAvailability = function(req, res, next){
  User.findOne({userName: req.body.userName}).then(
    document => {
      if(document===null || document._id===req.userData.userId){
        next();
      }else{
        res.status(400).json({
          type: "User name duplicated",
          message: "Another user already registered this user name",
        });
      }
    }
  ).catch(
    error => {
      console.log("error finding document", error);
    }
  );
}



const updateUserInfo = function(req, res, next){
  User.findOne({_id: req.userData.userId}).then(
    document => {
      User.updateOne({_id: req.userData.userId}, req.body)
      .then(
        result => {
          console.log("User updated", result);
          res.status(200).json({
            message: "User info updated"
          });
          // go to next middle ware if user name is updated
          if(document.userName!=req.body.userName){
            req.currentUserName = document.userName;
            next();
          }else{
            return;
          }
        }
      ).catch(
        error => {
          console.log("Error updating user", error);
        }
      );
    }
  ).catch(
    error => {
      console.log("Error finding user", error);
    }
  );
}


// put
router.put('/', checkAuth, checkEmailAvailability,
checkUserNameAvailability, updateUserInfo);



module.exports = router;
