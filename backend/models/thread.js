const mongoose = require('mongoose');

// An id of each thread will be automatically created by MongoDB
const threadSchema = mongoose.Schema({
  commentor: { type: String, required: true },// userName
  title: { type: String, required: true},
  content: { type: String, required: true},
  litId: { type: String, required:true}, // The hyphone-separated title + author name
  pageNumber: { type: String, required:true}
});

module.exports = mongoose.model('Thread', threadSchema);
