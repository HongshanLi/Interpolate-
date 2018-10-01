/*
* Create an assets dir for each user upon successful signup
*
*/
const Lit = require("../models/groupLit");
const Thread = require("../models/groupThread");

const fs = require('fs');
const path = require('path');

// Container for all helpers
const helpers = {};

helpers.createDir = function(assets_dir, userId){
  fs.mkdirSync(path.join(assets_dir, userId));
};



helpers.deleteFile = function(userDir, fileName){
  let filePath = path.join(userDir, fileName);
  try {
    fs.unlink(filePath, (err)=>{
      if (err){
        console.log("Error deleting file", err);
      }
    });
  }
  catch (error) {
    console.log("Error deleting file", error);
  }

};


// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = function(strLength){

  // Define all the possible characters that could go into a string
  let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789QWERTYUIOPASDFGHJKLZXCVBNM';

  // Start the final string
  let str = '';
  for(let i = 1; i <= strLength; i++) {
      // Get a random charactert from the possibleCharacters string
      let randomCharacter =
      possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
      // Append this character to the string
      str+=randomCharacter;
  }
  // Return the final string
  return str;
};

helpers.changeThreadsCount = function(litId, increament){
  Lit.findOne({_id: litId}).then(
    document => {
      console.log("lit found", document);
      document.threadsCount = document.threadsCount + increament;
      Lit.updateOne({_id: litId}, document).then(
        result => {
          console.log("lit updated", result);
          console.log("threads count incremented");
        }
      ).catch(
        error =>{
          console.log("error update threads count", error);
        }
      );
    }
  ).catch(
    error => {
      console.log("error finding lit", error);
    }
  );
}

helpers.changeResponsesCount = function(threadId, increment){
  Thread.findOne({_id: threadId}).then(
    document => {
      document.responsesCount = document.responsesCount + increment;
      Thread.updateOne({_id: threadId}, document).then(
        result => {
          console.log("responses count for " + threadId + " updated");
        }
      ).catch(
        error => {
          console.log("error updating responses count for " + threadId);
        }
      );
    }
  ).catch(
    error => {
      console.log("Error finding thread", threadId);
    }
  );
}


module.exports = helpers;
