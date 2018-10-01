const mongoose = require('mongoose');

// An id of each lit will be automatically created by MongoDB
const litSchema = mongoose.Schema({
  _id : { type: String, required: true},
  title: { type: String, required: true},
  authors: { type: String, required: true},
  userName: { type: String, required:true},
});

module.exports = mongoose.model('lit', litSchema);
