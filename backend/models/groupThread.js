const mongoose = require('mongoose');

// An id of each thread will be automatically created by MongoDB
const threadSchema = mongoose.Schema({
  _id: { type: String, required: true },
  groupId: { type: String, required: true},
  commentor: { type: String, required: true },// userName
  editorName: { type:String, required: false},
  title: { type: String, required: true},
  content: { type: String, required: true},
  litId: { type: String, required:true}, // The hyphone-separated title + author name
  pageNumber: { type: Number, required:true},
  highlightsCoord: { type: Array, required:false},
  createTime: { type:Number, required:true},
  lastEditTime: { type: Number, required: false},
  responsesCount: { type: Number, required: false},
});


module.exports = mongoose.model('GroupThread', threadSchema);
