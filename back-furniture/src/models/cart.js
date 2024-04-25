// blog_app/models/article.js
const mongoose = require("mongoose");
 
const cartSchema = new mongoose.Schema({
cartId:{ type: String, required: true, unique: true, immutable: true},
productId: {type: String,required: true},
userId: {type: String,required: true},
productDetailId: { type: String, required: true },
productName: {type: String,required: true},
price: {type: Number,required: true},
quantitySelected: {type: Number,required: true},
image: {type: String ,required: true},
brand: {type: String ,required: true},
});
 
const cartModel = mongoose.model("cart", cartSchema);
module.exports = cartModel;
