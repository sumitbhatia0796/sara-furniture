'use strict';

/**
 * Values Routes
 * @module routes/values
 * @requires controllers/values
 */
const Router = require('express');


const router = Router();

// import * as ctrlValue from '../controllers/user';
const ctrlValue = require('../controllers/user');
/**
 * @swagger
 * /api/user:
 *   post:
 *     tags:
 *       - "user"
 *     description: "Add value"
 *     operationId: ctrlValue.addUser
 *     requestBody:   # Use requestBody instead of parameters
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: name of user
 *               gender:
 *                 type: string
 *                 description: gender of user
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
router.post('/api/user', ctrlValue.addUser);

/**
 * @swagger
 * /api/user:
 *   get:
 *     tags:
 *       - "user"
 *     description: "Get user"
 *     operationId: ctrlValue.getUser
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
router.get('/api/user', ctrlValue.getUser);


module.exports = router;
