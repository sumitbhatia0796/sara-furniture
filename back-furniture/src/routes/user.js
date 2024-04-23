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
 *               firstName:
 *                 type: string
 *                 description: firstname of user
 *               lastName:
 *                 type: string
 *                 description: lastname of user
  *               username:
 *                 type: string
 *                 description: username of user
 *               email:
 *                 type: string
 *                 description: email of user
  *               password:
 *                 type: string
 *                 description: password of user
 *               confirmPassword:
 *                 type: string
 *                 description: confirmPassword of user
  *               mobile:
 *                 type: number
 *                 description: mobile no of user
 *               dataOfBirth:
 *                 type: string
 *                 description: Dateofbirth of user
  *               gender:
 *                 type: string
 *                 description: gender of user
 *               address:
 *                 type: string
 *                 description: address of user
  *               country:
 *                 type: string
 *                 description: country of user
 *               state:
 *                 type: string
 *                 description: state of user
 *               city:
 *                 type: string
 *                 description: city of user
 *               pin:
 *                 type: number
 *                 description: pincode of user
 * 
 * 
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
