const mongoose = require('mongoose');

// An id of each lit will be automatically created by MongoDB
const litSchema = mongoose.Schema({
  _id: { type: String, required: true},
  title: { type: String, required: true},
  authors: { type: String, required: true},
  userName: { type: String, required: true},
  groupId: { type: String, required: true}, // id of the group owning it
  uploadTime:{ type: Number, required: true},
  threadsCount: { type: Number, required: true},
});

module.exports = mongoose.model('groupLit', litSchema);
