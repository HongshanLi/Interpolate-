const mongoose = require('mongoose');

// An id of each thread will be automatically created by MongoDB
const threadSchema = mongoose.Schema({
  _id: { type: String, required: true },
  groupId: { type: String, required: true},
  creatorName: { type: String, required: true },// userName
  creatorId: { type: String, required:true},
  editorName: { type:String, required: false},
  editorId: { type: String, required: false},
  title: { type: String, required: true},
  content: { type: String, required: true},
  litId: { type: String, required:true},
  litTitle: { type: String, required:true},
  pageNumber: { type: Number, required:true},
  highlightsCoord: { type: Array, required:false},
  createTime: { type:Number, required:true},
  lastEditTime: { type: Number, required: false},
  followedBy: {type: Array, required:true},
  viewedBy: {type: Array, required: true},
  responsesCount: { type: Number, required: false},
});


module.exports = mongoose.model('GroupThread', threadSchema);
