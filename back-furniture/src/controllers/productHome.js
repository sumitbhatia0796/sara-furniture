'use strict';
 const ProductHome = require('../models/productHome');
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

 exports.getProductHome = wrapper(async (req, res,next) => {
  try {

    // verifyToken(req, res, () => {
    //    jwt.verify(req.token, options.secretKey,(err,authData)=>{
    //     if(err){
    //       return res.status(401).json({ error: 'Invalid Token' });
    //     }
    //    })
    // });

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
    const count = await ProductHome.countDocuments(filter);
    const { limit , offset } = calculateLimitAndOffset(currentPage,(pageSize > 200 ? 200 : pageSize));
    const productHome = await ProductHome.find(filter).limit(limit).skip(offset).sort([[sort, sortDirection]]);
    const meta = paginate(currentPage, count, productHome, (pageSize > 200 ? 200 : pageSize ));
    res.set(meta);
    return res.send(productHome)

  } catch (err) {
    return next(err);
  }
});

exports.addProductHome = wrapper(async (req, res) => {
  try {
 
    const {productName,imageUrl,description,productCategory} = req.body; // Use the User model to create a new user object
      
      const productHome = new ProductHome({productHomeId : uuidv4(), productName,imageUrl,description,productCategory});
  
      await productHome.save(); // Wait for the user to be saved to the database
      res.send(productHome); // Send the saved user object as the response
    } catch (err) {
      throw boom.boomify(err);
    }
});

exports.deleteAllProductHome = wrapper(async (req, res) => {
  try {
    const productHome = await ProductHome.deleteMany({});
    if(productHome.deletedCount > 0) console.log("Deleted" +productHome.deletedCount+ " productHome");
      res.status(204).send("ALL Deleted"); // Send the saved user object as the response
    } catch (err) {
      throw boom.boomify(err); 
    }
});
exports.getProductHomeById = wrapper(async (req, res) => {
  try {
    const productHomeSelectedId = req?.params?.productHomeId;
    const productHome = await ProductHome.findOne({productHomeId: productHomeSelectedId});

    if(!productHome){
      throw boom.notFound("No product found with that productId");
    }
     return res.send(productHome);
    } catch (err) {
      throw boom.boomify(err); 
    }
});

exports.updateProductHomeById = wrapper(async (req, res) => {
  try {
    const productHomeSelectedId = req?.params?.productHomeId;
    const productHome = await ProductHome.findOne({productHomeId : productHomeSelectedId});
    if (!productHome) {
      throw boom.notFound("No product found with that productId");
    }
    if(!!req.body.productName) productHome.productName = req.body.productName;
    if(!!req.body.imageUrl) productHome.imageUrl = req.body.imageUrl;
    if(!!req.body.description) productHome.description = req.body.description;
    if(!!req.body.productCategory) productHome.productCategory = req.body.productCategory;
   
    let productHomeUpdate = await productHome.save();
    return res.send(productHomeUpdate);
  } catch (err) {
    throw boom.boomify(err);
  }
});
exports.deleteProductHomeById = wrapper(async (req, res) => {
  try {
    const productHomeSelectedId = req?.params?.productHomeId;
    const productHome = await ProductHome.deleteOne({productHomeId: productHomeSelectedId});

    if(productHome.deletedCount === 0){
      throw boom.notFound("No ProductHome found with that productHomeId");
    }
     return res.status(204).send("deleted ProductHome");
    } catch (err) {
      throw boom.boomify(err); 
    }
});



