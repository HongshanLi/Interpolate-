const mongoose = require('mongoose');

// An id of each thread will be automatically created by MongoDB
const annotationSchema = mongoose.Schema({
  _id: { type: String, required: true },
  entityType: {type:String, required:true},
  entityId: {type:String},
  documentId: { type: String, required: true},
  creatorId: { type: String, required:true},
  title: {type: String },
  content: {type:String, required:true},
  editorId: { type: String },
  page: { type: Number, required:true},
  highlightsCoord: { type: Array, required:false},
  createTime: { type:Number, required:true},
  lastEditTime: { type: Number, required: false},
  followedBy: {type: Array, required:true},
  viewedBy: {type: Array, required: true},
  parent: { type:String },
  children: { type: Array }
});


module.exports = mongoose.model('Annotation', annotationSchema);
