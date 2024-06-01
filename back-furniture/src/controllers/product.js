'use strict';
 const Product = require('../models/product');
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

 exports.getProduct = wrapper(async (req, res,next) => {

  try {

  //   verifyToken(req, res, () => {
  //     jwt.verify(req.token, options.secretKey,(err,authData)=>{
  //      if(err){
  //       return res.status(401).json({ error: 'Invalid Token' });
  //     }
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
    const count = await Product.countDocuments(filter);
    const { limit , offset } = calculateLimitAndOffset(currentPage,(pageSize > 200 ? 200 : pageSize));
    const productDetail = await Product.find(filter).limit(limit).skip(offset).sort([[sort, sortDirection]]);
    const meta = paginate(currentPage, count, productDetail, (pageSize > 200 ? 200 : pageSize ));
    res.set(meta);
    return res.send(productDetail)

  } catch (err) {
    return next(err);
  }
});

exports.addProduct = wrapper(async (req, res) => {
  try {
    const {
      productName,description,price,homecategory,category,subcategory,availability,quantity,image,rating,brand
    } = req.body; // Use the User model to create a new user object

    const product = new Product({
      productId: uuidv4(),
      productName,description,price,homecategory,category,subcategory,availability,quantity,image,rating,brand
    });

    await product.save(); // Wait for the user to be saved to the database
    res.send(product); // Send the saved user object as the response
  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.deleteAllProduct = wrapper(async (req, res) => {
  try {
    const product = await Product.deleteMany({});
    if(product.deletedCount > 0) console.log("Deleted" +product.deletedCount+ " product");
      res.status(204).send("ALL Deleted"); // Send the saved user object as the response
    } catch (err) {
      throw boom.boomify(err); 
    }
});
exports.getProductById = wrapper(async (req, res) => {
  try {
    const productSelectedId = req?.params?.productId;
    const product = await Product.findOne({productId: productSelectedId});

    if(!product){
      throw boom.notFound("No product found with that productId");
    }
     return res.send(product);
    } catch (err) {
      throw boom.boomify(err); 
    }
});

exports.updateProductById = wrapper(async (req, res) => {
  try {
    const productSelectedId = req?.params?.productId;
    const product = await Product.findOne({productId : productSelectedId});
    if (!product) {
      throw boom.notFound("No product found with that productId");
    }
    if(!!req.body.productName) product.productName = req.body.productName;
    if(!!req.body.image) product.image = req.body.image;
    if(!!req.body.description) product.description = req.body.description;
    if(!!req.body.productCategory) product.productCategory = req.body.productCategory;
    if(!!req.body.price) product.price = req.body.price;
    if(!!req.body.homecategory) product.homecategory = req.body.homecategory;
    if(!!req.body.category) product.category = req.body.category;
    if(!!req.body.subcategory) product.subcategory = req.body.subcategory;
    if(!!req.body.availability) product.availability = req.body.availability;
    if(!!req.body.quantity) product.quantity = req.body.quantity;
    if(!!req.body.image) product.image = req.body.image;
    if(!!req.body.rating) product.rating = req.body.rating;
    if(!!req.body.brand) product.brand = req.body.brand;

    let productUpdate = await product.save();
    return res.send(productUpdate);
  } catch (err) {
    throw boom.boomify(err);
  }
});
exports.deleteProductById = wrapper(async (req, res) => {
  try {
    const productHomeSelectedId = req?.params?.productHomeId;
    const productDetail = await Product.deleteOne({productHomeId: productHomeSelectedId});

    if(productDetail.deletedCount === 0){
      throw boom.notFound("No Product found with that productHomeId");
    }
     return res.status(204).send("deleted Product");
    } catch (err) {
      throw boom.boomify(err); 
    }
});



exports.getFilteredProduct = wrapper(async (req, res,next) => {

  try {

  //   verifyToken(req, res, () => {
  //     jwt.verify(req.token, options.secretKey,(err,authData)=>{
  //      if(err){
  //       return res.status(401).json({ error: 'Invalid Token' });
  //     }
  //     })
  //  });

    let filter = {};
    if(!!req.body.productFilter){
      filter = req.body.productFilter
   }
    
   let pipe =[{
      $match: filter
   }];
    const productDetail = await Product.aggregate(pipe);
    return res.send(productDetail)

  } catch (err) {
    return next(err);
  }
});