const mongoose  = require('mongoose');

const ActivitySchema = mongoose.Schema({
  _id: {type: String, required: true},
  activityType: {type: String, required: true},
  userId: {type: String, required: true},
  date_time: {type: Number, required: true},
  entityId : {type: String, required: true},
  annotationId: {type: String, required: false},
  classId: {type: String, required: false},
  documentId: {type: String, required: false},
  ticketId: {type: String, required: false},
});

module.exports = mongoose.model('Activity', ActivitySchema);
