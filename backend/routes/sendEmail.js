var nodemailer = require('nodemailer');
const GroupThread = require("../models/groupThread");

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'geniessung@gmail.com',
    pass: '$$wonderful2017$$'
  }
});

var mailOptions = {
  from: 'geniessung@gmail.com',
  to: 'lihongshan1989@live.cn',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

const currentUserName="Hong";


  GroupThread.find({commentor:currentUserName}).then(
    documents=>{
      documents.forEach(document=>{
        console.log(document);
        if(document.commentor===currentUserName &&
          document.editorName===currentUserName){
          console.log("They are the same", document);
        }else if(document.commentor === currentUserName){
          console.log("commentor", document);
        }else if(document.editorName === currentUserName){
          console.log("editor", document);
        }
      });
    });

/*
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
