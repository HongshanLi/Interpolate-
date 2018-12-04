const mongoose = require("mongoose");


const classSchema = mongoose.Schema({
  _id: {type:String, required:true},
  creatorId: { type:String, required:true},
  name: { type:String, required:true },
  description: { type:String, required:true},
  membersId: { type: Array, required: true },
});


module.exports = mongoose.model("Class", classSchema);
