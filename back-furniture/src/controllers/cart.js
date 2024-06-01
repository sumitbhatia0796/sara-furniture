'use strict';
 const Cart = require('../models/cart');
 const { v4:uuidv4 } = require('uuid') ;
 const boom = require("@hapi/boom");
 const {calculateLimitAndOffset, paginate } = require ('paginate-info');
 const { verifyToken } = require('../utils/utils')
 const jwt = require("jsonwebtoken");
 const options = require("../config/options");
 const wrapper = fn =>(req,res,next) =>{
  Promise.resolve(fn(req,res,next)).catch((err)=>{
    if(!err.isBoom){
      return next(boom.badImplementation(err));
    }
  })
 }

 exports.getProductInCart = wrapper(async (req, res, next) => {

  try {

    // verifyToken(req, res, () => {
    //     jwt.verify(req.token, options.secretKey,(err,authData)=>{
    //         if (err) {
    //             // Sending an error response when token is invalid
    //             return res.status(401).json({ error: 'Invalid Token' });
    //           }
    //     })
    //  });

    let filter = {};
    const currentPage = req.query.currentPage || '1';
    const pageSize = req.query.pageSize || '50';
    const sort = req.query.sort || 'createTime';
    const sortDirection = req.query.sortDirection || 'asc';
    // const result = await User.find({});
    // res.status(200).send(result);
    if(!!req.query.filter){
       filter = JSON.parse(req.query.filter); 
    }
    const count = await Cart.countDocuments(filter);
    const { limit , offset } = calculateLimitAndOffset(currentPage,(pageSize > 200 ? 200 : pageSize));
    const cart = await Cart.find(filter).limit(limit).skip(offset).sort([[sort, sortDirection]]);
    const meta = paginate(currentPage, count, cart, (pageSize > 200 ? 200 : pageSize ));
    res.set(meta);
    return res.send(cart)

  } catch (err) {
    return next(err);
  }
});

exports.addProductInCart = wrapper(async (req, res,next) => {
  try {

    // verifyToken(req, res, () => {
    //     jwt.verify(req.token, options.secretKey,(err,authData)=>{
    //         if (err) {
    //             // Sending an error response when token is invalid
    //             return res.status(401).json({ error: 'Invalid Token' });
    //           }
    //     })
    //  });
    const {
        productName,price,quantitySelected,image,brand,productId,productDetailId,userId
    } = req.body; // Use the User model to create a new user object

    const cart = new Cart({
        cartId: uuidv4(),productId,productDetailId,userId,
      productName,price,quantitySelected,image,brand
    });

    await cart.save(); // Wait for the user to be saved to the database
    res.send(cart); // Send the saved user object as the response
  } catch (err) {
    return next(err);
  }
});

exports.deleteAllProductInCart = wrapper(async (req, res, next) => {
  try {
    const cart = await Cart.deleteMany({});
    if(cart.deletedCount > 0) console.log("Deleted" +cart.deletedCount+ " cart");
      res.status(204).send("ALL Deleted"); // Send the saved user object as the response
    } catch (err) {
        return next(err);
    }
});
exports.getProductInCartById = wrapper(async (req, res, next) => {
  try {
    const cartSelectedId = req?.params?.cartId;
    const cart = await Cart.findOne({cartId: cartSelectedId});

    if(!cart){
      throw boom.notFound("No cart found with that CartId");
    }
     return res.send(cart);
    } catch (err) {
        return next(err);
    }
});

exports.updateProductInCartById = wrapper(async (req, res, next) => {
  try {
    const cartSelectedId = req?.params?.cartId;
    const cart = await Cart.findOne({cartId : cartSelectedId});
    if (!cart) {
      throw boom.notFound("No cart found with that CartId");
    }
    if(!!req.body.productName) cart.productName = req.body.productName;
    if(!!req.body.image) cart.image = req.body.image;
    if(!!req.body.price) cart.price = req.body.price;
    if(!!req.body.quantitySelected) cart.quantitySelected = req.body.quantitySelected;
    if(!!req.body.brand) cart.brand = req.body.brand;

    let productUpdate = await cart.save();
    return res.send(productUpdate);
  } catch (err) {
    return next(err);
  }
});
exports.deleteProductInCartById = wrapper(async (req, res, next) => {
  try {

    // verifyToken(req, res, () => {
    //     jwt.verify(req.token, options.secretKey,(err,authData)=>{
    //      if(err){
    //        res.send("Invalid Token")
    //      }
    //     })
    //  });
    const cartSelectedId = req?.params?.cartId;
    const cart = await Cart.deleteOne({cartId: cartSelectedId});

    if(cart.deletedCount === 0){
      throw boom.notFound("No Cart found with that CartId");
    }
     return res.send({message: 'Item Deleted'});
    } catch (err) {
        return next(err);
    }
});



