// blog_app/models/article.js
const mongoose = require("mongoose");

const productDetailSchema = new mongoose.Schema({
  productDetailId: { type: String, required: true },
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  homeCategory: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  availability: { type: Boolean, required: false },
  quantity: { type: Number, required: true },
  rating: { type: Number, required: false },
  images: { type: [String], required: false },
  assembly: { type: String, required: true },
  brand: { type: String, required: true },
  material: { type: String, required: true },
  color: { type: String, required: true },
  type: { type: String, required: true },
  totalOrder: { type: Number, required: true },
  dimensionInInch: { type: String, required: true },
  dimensionInCem: { type: String, required: true },
  storage: { type: String, required: true },
  weight: { type: String, required: true },
  warranty: { type: Number, required: true },
});

const productDetailModel = mongoose.model("ProductDetail", productDetailSchema);
module.exports = productDetailModel;
