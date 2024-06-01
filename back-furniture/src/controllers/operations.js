const userController = require('../controllers/user');
const productHomeController = require('../controllers/productHome');
const productController = require('../controllers/product');
const productDetailController = require('../controllers/productDetail');
const cartController = require('../controllers/cart');



const operations = Object.assign({},
    userController,
    productHomeController,
    productController,
    productDetailController,
    cartController

)

module.exports = operations;