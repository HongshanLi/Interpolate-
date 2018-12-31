const mongoose = require("mongoose");


const ticketSchema = mongoose.Schema({
  _id: { type: String, required: true },
  content: {type:String, required:true},
  userEmail: {type:String, required:true},
  userId: {type:String, required:true},
  fullname: {type: String, required: true},
  unread: {type:Boolean, required:true},
})
module.exports = mongoose.model("Ticket", ticketSchema);
