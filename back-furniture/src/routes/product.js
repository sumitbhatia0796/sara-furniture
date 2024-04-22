'use strict';

const Router = require('express');


const router = Router();


const ctrlProduct = require('../controllers/product');
/**
 * @swagger
 * /api/product:
 *   post:
 *     tags:
 *       - "product"
 *     description: "Add value"
 *     operationId: ctrlProduct.addProduct
 *     requestBody:   # Use requestBody instead of parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: product name
 *               price:
 *                 type: number
 *                 description: product price
 *               description:
 *                 type: string
 *                 description: description of product
 *               homecategory:
 *                 type: string
 *                 description: homecategory of product
 *               category:
 *                 type: string
 *                 description: category of product
 *               subcategory:
 *                 type: string
 *                 description: subcategory of product
 *               availability:
 *                 type: string
 *                 description:  availability of product
 *               quantity:
 *                 type: number
 *                 description: quantity of product
 *               images:
 *                 type: string
 *                 description: images of product
 *               reviews:
 *                 type: string
 *                 description: reviews of product
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
router.post('/api/product', ctrlProduct.addProduct);

/**
 * @swagger
 * /api/product:
 *   get:
 *     tags:
 *       - "product"
 *     description: "Get user"
 *     operationId: ctrlProduct.getProduct
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
router.get('/api/product', ctrlProduct.getProduct);

/**
 * @swagger
 * /product:
 *   delete:
 *     summary: Delete product 
 *     tags: [product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: product 
 *         schema:
 *           type: integer
 *         example:
 *             658918e852a0131af4c0aab1
 *     responses:
 *       204:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete('/api/product',ctrlProduct.deleteProduct);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product
 *         schema:
 *           type: integer
 *         example:
 *             658918e852a0131af4c0aab1
 *     responses:
 *       204:
 *         description: product deleted successfully
 *       404:
 *         description: product not found
 */
router.delete('/api/product/:id',ctrlProduct.deleteProductById);

module.exports = router;
