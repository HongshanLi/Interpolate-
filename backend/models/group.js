const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const groupSchema = mongoose.Schema({
  _id: {type:String, required:true},
  creatorId: { type:String, required:true},
  groupName: { type:String, required:true, unique:true },
  groupInterests: { type:String, required:true},
  membersId: { type: Array, required: true },
});

groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Group", groupSchema);
