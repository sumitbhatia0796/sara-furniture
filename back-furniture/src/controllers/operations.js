const userController = require('../controllers/user');
const productHomeController = require('../controllers/productHome');
const productController = require('../controllers/product');


const operations = Object.assign({},
    userController,
    productHomeController,
    productController


)

module.exports = operations;