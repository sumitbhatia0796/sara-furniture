const userController = require('../controllers/user');
const productHomeController = require('../controllers/productHome');
const productController = require('../controllers/product');
const productDetailController = require('../controllers/productDetail');


const operations = Object.assign({},
    userController,
    productHomeController,
    productController,
    productDetailController

)

module.exports = operations;