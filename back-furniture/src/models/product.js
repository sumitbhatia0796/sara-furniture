// blog_app/models/article.js
const mongoose = require("mongoose");
 
const productSchema = new mongoose.Schema({
productId: {type: String,required: true},
productName: {type: String,required: true},
description: {type: String,required: true},
price: {type: Number,required: true},
homecategory: {type: String,required: true},
category: {type: String,required: true},
subcategory: {type: String,required: true},
availability: {type: Boolean,required: true},
quantity: {type: Number,required: true},
image: {type: String ,required: true},
rating: {type: Number,required: false},
brand: {type: String ,required: true},
});
 
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
