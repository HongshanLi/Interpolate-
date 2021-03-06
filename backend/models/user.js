const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  _id : {type: String},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique:true },
  password: { type: String, required: true},
  affiliation: { type: String, required: true},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
