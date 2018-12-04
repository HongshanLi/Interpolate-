const mongoose = require('mongoose');

// An id of each lit will be automatically created by MongoDB
const DocSchema = mongoose.Schema({
  _id: { type: String, required: true},
  title: { type: String, required: true},
  authors: { type: String },
  userId: { type: String, required: true},
  entityType: {type:String, required:true},
  entityId:{type:String },
  uploadTime:{ type: Number, required: true},
  threadsCount: { type: Number, required: true},
  fileType:{type:String, required:true},
});

module.exports = mongoose.model('Doc', DocSchema);
