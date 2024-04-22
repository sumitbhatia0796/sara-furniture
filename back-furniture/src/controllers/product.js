'use strict';
 const Product = require('../models/product');
 const { v4:uuidv4 } = require('uuid') ;
 const boom = require("@hapi/boom");
/**
 * getValue controller
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const getProduct = async (req, res, next) => {
  try {
    const result = await Product.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({
      message: err.message,
      status: 'failure',
    });
  }
};
module.exports.getProduct = getProduct;

/**
 * addValue controller
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const addProduct = async (req, res, next) => {
 try {
 
  const {productName,price,description,homecategory,
    category,subcategory,availability,quantity,images,reviews} = req.body; // Use the User model to create a new user object
    
    const product = new Product({productId : uuidv4(), productName,price,description,homecategory,
        category,subcategory,availability,quantity,images,reviews});

    await product.save(); // Wait for the user to be saved to the database
    res.send(product); // Send the saved user object as the response
  } catch (error) {
    boom.badRequest(error);
    res.status(500).send(error); // Handle any errors that occur during saving
  }
};
module.exports.addProduct = addProduct;


/**
 * deleteValue controller
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const deleteProduct = (req, res, next) => {
    try {
      res.status(200).send({
        data: 'Value deleted',
        status: 'success',
      });
    } catch (err) {
      res.status(404).send({
        message: err.message,
        status: 'failure',
      });
    }
  };
  module.exports.deleteProduct = deleteProduct;

  const deleteProductById = (req, res, next) => {
    try {
      res.status(200).send({
        data: 'Value deleted',
        status: 'success',
      });
    } catch (err) {
      res.status(404).send({
        message: err.message,
        status: 'failure',
      });
    }
  };
  module.exports.deleteProductById = deleteProductById;

  
  
