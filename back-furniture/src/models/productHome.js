// blog_app/models/article.js
const mongoose = require("mongoose");
 
const productHomeSchema = new mongoose.Schema({
  productHomeId: { type: String, required: true, unique: true, immutable: true},
  productName: { type: String, required: true,},
  imageUrl: { type: String, },
  description: {type: String, required: true},
  productCategory: {type: String, required: true},
  createdDateAt: { type: Date, default: Date.now },
});
 
const productHomeModel = mongoose.model("ProductHome", productHomeSchema);
module.exports = productHomeModel;
