const mongoose = require("mongoose");

// The Groupsthreads each user is following

const userFollows = mongoose.Schema({
  _id: {type:String, required:true},
  groups:{type:String, required:true},
  groupThreads: {type: Array, required:true}
});

module.exports = mongoose.model("UserFollows", userFollows);
