const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");
const Group = require("../models/group");
const GroupLit = require("../models/groupLit");
const GroupThread = require("../models/groupThread");
const GroupResponse = require("../models/groupResponse");
const checkAuth = require("../middleware/check-auth");
const helpers = require("../lib/helpers");
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


// search users
const searchUsers = function(req, res, next){
  //search by name
  const queryStr = req.query.queryStr.toUpperCase();
  User.find({$text: {$search: queryStr}}).then(
    documents =>{
      let results = []
      documents.forEach(document=>{

        document._id = null;
        document.email = null;
        document.password = null;
        document.tag = null;
        results.push(document);
      });
      req.results = results;
      next();
    }
  );
}
router.get("/query", checkAuth, searchUsers, (req, res, next) => {
  console.log("Found result");
  res.status(200).json({
    results: req.results,
  });
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


// signup
router.post('/signup', (req, res, next)=>{
  // hash the password
  bcrypt.hash(req.body.password, 10)
  .then(hashed => {
    // create new user object
    // @TODO needs to verify the user input
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
        userId: result._id
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
      const token = jwt.sign(
        {email: req.userInfo.email, userId: req.userInfo._id},
        config.JWT_KEY,
        { expiresIn: "5h"}
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
  console.log("sending token");
  console.log(req.userInfo);
  res.status(200).json({
    token: req.token,
    expiresIn: 3600*5,
    userName: req.userInfo.userName,
    userId: req.userInfo._id,
  });
}

router.post('/login', findUser, checkPassword, sendTokenAndUsername);




// user forgets password, request password reset
const findUserByEmail = function(req, res, next){
  User.findOne({email: req.query.email}).then(
    userInfo =>{
      if(userInfo!=null){
        req.userInfo = userInfo;
        next();
      } else{
        res.status(404).json({
          message: req.query.email + " is not registered."
        });
        return;
      }
    }
  );
}

const generateTmpPassword = function(req, res, next){
  const tmpPass = helpers.createRandomString(config.tmpPassLength);
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
      console.log("user password reset");
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
    });
}

router.get('/passwordReset/forgotPassword',
  findUserByEmail, generateTmpPassword, updateUserPassword,
  sendTmpPassEmail, (req, res, next)=>{
  res.status(200).json({
    message: "A temporary password has been sent to your email."
  });
});

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

const updateTag = function(req, res, next){
  const data = req.body;
  const tag = data.firstName.toUpperCase() + " "
  + data.lastName.toUpperCase() + " "
  + data.userName.toUpperCase() + " "
  + data.affiliation.toUpperCase();

  req.body.tag = tag;
  console.log("updated body", req.body);
  next();
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



//Update every item in the data base to the new user name
const updateItemsWithUserName = function(req, res, next){
  const currentUserName = req.currentUserName;
  const newUserName = req.body.userName;

  // update group creator and members
  Group.find({members: currentUserName}).then(
    documents => {
      console.log("updating members");
      documents.forEach(group => {
        const index = group.members.indexOf(currentUserName);
        group.members[index] = newUserName;

        //update creator name if creator is the currentUser
        if(group.creator===currentUserName){
          group.creator=newUserName;
        }

        console.log("new group", group);
        Group.updateOne({_id: group._id}, group).then(
          result=>{
            console.log(result);
          }
        ).catch(
          error=>{
            console.log(error);
          }
        );
      });
    }
  ).catch(
    error => {
      console.log("Error finding groups", error);
    }
  ).catch(
    error=>{
      console.log(error);
    }
  );

  // update group pending  members
  Group.find({pendingMembers: currentUserName}).then(
    documents => {
      console.log("updating members");
      documents.forEach(group => {
        const index = group.members.indexOf(currentUserName);
        group.pendingMembers[index] = newUserName;

        Group.updateOne({_id: group._id}, group).then(
          result=>{
            console.log(result);
          }
        ).catch(
          error=>{
            console.log(error);
          }
        );
      });
    }
  ).catch(
    error => {
      console.log("Error finding groups", error);
    }
  ).catch(
    error=>{
      console.log(error);
    }
  );


  // update GroupLit uploader
  GroupLit.find({userName: currentUserName}).then(
    documents=>{
      documents.forEach(lit=>{
        lit.userName = newUserName;
        GroupLit.update({_id: lit._id}, lit).then(
          result=>{
            console.log(result);
          }
        ).catch(
          error=>{
            console.log(error);
          }
        );
      });
    }
  ).catch(
    error=>{
      console.log(error);
    }
  );

  // update GroupThread creator or editor;
  GroupThread.find({$or:[{commentor: currentUserName},
    {editorName:currentUserName}]}).then(
    documents=>{
      documents.forEach(document=>{
        console.log("old doc", document);
        if(document.commentor===currentUserName){
            document.commentor=newUserName;
        }
        if(document.editorName===currentUserName){
          document.editorName = newUserName;
        }
        console.log("new doc", document);
        GroupThread.updateOne({_id: document._id}, document).then(
          result=>{
            console.log(result);
          }
        ).catch(
          error=>{
            console.log(error);
          }
        );
      });
    }).catch(
      error=>{
        console.log(error);
      }
    );

  // update GroupResponse creator and editor
  GroupResponse.find({$or:[{creatorName: currentUserName},
    {editorName: currentUserName}]}).then(
    documents=>{
    documents.forEach(document=>{
      if(document.creatorName===currentUserName){
          document.creatorName=newUserName;
      }
      if(document.editorName===currentUserName){
        document.editorName = newUserName;
      }
      console.log("new doc", document);
      GroupResponse.updateOne({_id: document._id}, document).then(
        result=>{
          console.log(result);
        }
      ).catch(
        error=>{
          console.log(error);
        }
      );
    });
  }).catch(
    error=>{
      console.log(error);
    }
  );

}

// put
router.put('/', checkAuth, checkEmailAvailability,
checkUserNameAvailability, updateTag, updateUserInfo,
updateItemsWithUserName);



module.exports = router;
