'use strict';

const Router = require('express');


const router = Router();


const ctrlProductHome = require('../controllers/productHome');
/**
 * @swagger
 * /api/productHome:
 *   post:
 *     tags:
 *       - "productHome"
 *     description: "Add value"
 *     operationId: ctrlProductHome.addProductHome
 *     requestBody:   # Use requestBody instead of parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: productname of product
 *               imageUrl:
 *                 type: string
 *                 description: imageUrl of product
  *               description:
 *                 type: string
 *                 description: description of product
 *               productCategory:
 *                 type: string
 *                 description: productcategory of product
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Add Value Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 gender:
 *                   type: string
 */
router.post('/api/productHome', ctrlProductHome.addProductHome);

/**
 * @swagger
 * /api/productHome:
 *   get:
 *     tags:
 *       - "productHome"
 *     description: "Get user"
 *     operationId: ctrlProductHome.getProductHome
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Add Value Response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 gender:
 *                   type: string
 */
router.get('/api/productHome', ctrlProductHome.getProductHome);


module.exports = router;
