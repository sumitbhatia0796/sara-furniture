'use strict';
 const ProductDetail = require('../models/productDetail');
 const { v4:uuidv4 } = require('uuid') ;
 const boom = require("@hapi/boom");
 const {calculateLimitAndOffset, paginate } = require ('paginate-info');

 const wrapper = fn =>(req,res,next) =>{
  Promise.resolve(fn(req,res,next)).catch((err)=>{
    if(!err.isBoom){
      return next(boom.badImplementation(err));
    }
  })
 }

 exports.getProductDetail = wrapper(async (req, res) => {
  try {
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
    const count = await ProductDetail.countDocuments(filter);
    const { limit , offset } = calculateLimitAndOffset(currentPage,(pageSize > 200 ? 200 : pageSize));
    const productDetail = await ProductDetail.find(filter).limit(limit).skip(offset).sort([[sort, sortDirection]]);
    const meta = paginate(currentPage, count, productDetail, (pageSize > 200 ? 200 : pageSize ));
    res.set(meta);
    return res.send(productDetail)

  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.addProductDetail = wrapper(async (req, res) => {
  try {
    const {
      productId,productName,description, price,homeCategory,category,subcategory,availability,quantity,rating, images, assembly,
      brand, material,color,type,totalOrder,dimensionInInch,dimensionInCem,storage,weight, warranty
    } = req.body; // Use the User model to create a new user object

    const productDetail = new ProductDetail({
      productDetailId: uuidv4(),
      productId,productName,description, price,homeCategory,category,subcategory,availability,quantity,rating, images, assembly,
      brand, material,color,type,totalOrder,dimensionInInch,dimensionInCem,storage,weight, warranty
    });

    await productDetail.save(); // Wait for the user to be saved to the database
    res.send(productDetail); // Send the saved user object as the response
  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.deleteAllProductDetail = wrapper(async (req, res) => {
  try {
    const productDetail = await ProductDetail.deleteMany({});
    if(productDetail.deletedCount > 0) console.log("Deleted" +productDetail.deletedCount+ " productDetail");
      res.status(204).send("ALL Deleted"); // Send the saved user object as the response
    } catch (err) {
      throw boom.boomify(err); 
    }
});
exports.getProductDetailById = wrapper(async (req, res) => {
  try {
    const productDetailSelectedId = req?.params?.productDetailId;
    const productDetail = await ProductDetail.findOne({productDetailId: productDetailSelectedId});

    if(!productDetail){
      throw boom.notFound("No product found with that productId");
    }
     return res.send(productDetail);
    } catch (err) {
      throw boom.boomify(err); 
    }
});

exports.updateProductDetailById = wrapper(async (req, res) => {
  try {
    const productDetailSelectedId = req?.params?.productDetailId;
    const productDetail = await ProductDetail.findOne({productDetailId : productDetailSelectedId});
    if (!productDetail) {
      throw boom.notFound("No product found with that productId");
    }
    if(!!req.body.productName) productDetail.productName = req.body.productName;
    if(!!req.body.productId) productDetail.productId = req.body.productId;
    if(!!req.body.description) productDetail.description = req.body.description;   
    if(!!req.body.price) productDetail.price = req.body.price;
    if(!!req.body.homeCategory) productDetail.homeCategory = req.body.homeCategory;
    if(!!req.body.category) productDetail.category = req.body.category;
    if(!!req.body.subcategory) productDetail.subcategory = req.body.subcategory;
    if(!!req.body.availability) productDetail.availability = req.body.availability;
    if(!!req.body.quantity) productDetail.quantity = req.body.quantity;
    if(!!req.body.images) productDetail.images = req.body.images;
    if(!!req.body.rating) productDetail.rating = req.body.rating;
    if(!!req.body.type) productDetail.type = req.body.type;
    if(!!req.body.color) productDetail.color = req.body.color;
    if(!!req.body.brand) productDetail.brand = req.body.brand;
    if(!!req.body.material) productDetail.material = req.body.material; 
    if(!!req.body.totalOrder) productDetail.totalOrder = req.body.totalOrder;
    if(!!req.body.assembly) productDetail.assembly = req.body.assembly;
    if(!!req.body.dimensionInInch) productDetail.dimensionInInch = req.body.dimensionInInch;
    if(!!req.body.dimensionInCem) productDetail.dimensionInCem = req.body.dimensionInCem;
    if(!!req.body.storage) productDetail.storage = req.body.storage;
    if(!!req.body.weight) productDetail.weight = req.body.weight;
    if(!!req.body.warranty) productDetail.warranty = req.body.warranty;

    let productDetailUpdate = await productDetail.save();
    return res.send(productDetailUpdate);
  } catch (err) {
    throw boom.boomify(err);
  }
});
exports.deleteProductDetailById = wrapper(async (req, res) => {
  try {
    const productDetailSelectedId = req?.params?.productDetailId;
    const productDetail = await ProductDetail.deleteOne({productDetailId: productDetailSelectedId});

    if(productDetail.deletedCount === 0){
      throw boom.notFound("No ProductDetail found with that productHomeId");
    }
     return res.status(204).send("deleted ProductDetail");
    } catch (err) {
      throw boom.boomify(err); 
    }
});

exports.getProductDetailByProductId = wrapper(async (req, res) => {
  try {
    const productDetailSelectedId = req?.params?.productId;
    const productDetail = await ProductDetail.findOne({productId: productDetailSelectedId});

    if(!productDetail){
      throw boom.notFound("No product found with that productId");
    }
     return res.send(productDetail);
    } catch (err) {
      throw boom.boomify(err); 
    }
});


