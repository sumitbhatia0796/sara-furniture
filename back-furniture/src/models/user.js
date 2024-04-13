// blog_app/models/article.js
import mongoose from "mongoose";
 
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true,},
  lastName: { type: String, },
  username: {type: String, required: true},
  email: {type: String, required: true},
  password:{type: String, required: true},
  confirmPassword: {type: String, required: true},
  mobile: {type: Number, required: true},
  dataOfBirth: {type: Date, required: true},
  gender: {type: String, required: true},
  address: {type: String, required: true},
  country: {type: String, required: true},
  state: {type: String, required: true},
  city:{type: String, required: true},
  pin: {type: Number, required: true},
  createdDateAt: { type: Date, default: Date.now },
});
 
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
