'use strict';
 const User = require('../models/user');
/**
 * getValue controller
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const getUser = async (req, res, next) => {
  try {
    const result = await User.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send({
      message: err.message,
      status: 'failure',
    });
  }
};
module.exports.getUser = getUser;

/**
 * addValue controller
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const addUser = async (req, res, next) => {
  const user = new User(req.body); // Use the User model to create a new user object
  try {
    await user.save(); // Wait for the user to be saved to the database
    res.send(user); // Send the saved user object as the response
  } catch (error) {
    res.status(500).send(error); // Handle any errors that occur during saving
  }
};
module.exports.addUser = addUser;

/**
 * deleteValue controller
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
const deleteValue = (req, res, next) => {
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
module.exports.deleteValue = deleteValue;
