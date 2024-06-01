// blog_app/models/article.js
const mongoose = require("mongoose");
 
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, immutable: true},
  firstName: { type: String, required: true,},
  lastName: { type: String, },
  username: {type: String, required: true},
  email: {type: String, required: true},
  password:{type: String, required: true},
  mobile: {type: String, required: true},
  dataOfBirth: {type: String, required: true},
  gender: {type: String, required: true},
  address: {type: String, required: true},
  country: {type: String, required: true},
  state: {type: String, required: true},
  city:{type: String, required: true},
  pin: {type: String, required: true},
  createdDateAt: { type: Date, default: Date.now },
  userType: {type: String, default: "customer"},
});
 
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
