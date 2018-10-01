const mongoose = require('mongoose');

// An id of each thread will be automatically created by MongoDB
const threadSchema = mongoose.Schema({
  _id : { type:String, required:true},
  threadId: { type:String, required:true},
  groupId: { type:String, required:true },
  creatorName: { type: String, required: true}, // used to identify thread ownership
  editorName: { type: String, required: false },// userName
  responseContent: { type: String, required: true},
  createTime: { type: Number, required: true},
  lastEditTime: { type: Number, required: false},
});

module.exports = mongoose.model('Response', threadSchema);
