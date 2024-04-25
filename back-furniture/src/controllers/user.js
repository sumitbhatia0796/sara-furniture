"use strict";
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const boom = require("@hapi/boom");
const { calculateLimitAndOffset, paginate } = require("paginate-info");
const jwt = require("jsonwebtoken");
const options = require("../config/options");
const { verifyToken ,hasPass, compare} = require('../utils/utils')
const { sendMail} = require('../utils/sendMail')
const wrapper = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (!err.isBoom) {
      return next(boom.badImplementation(err));
    }
  });
};

exports.getUser = wrapper(async (req, res) => {
  try {
    let filter = {};
    const currentPage = req.query.currentPage || "1";
    const pageSize = req.query.pageSize || "50";
    const sort = req.query.sort || "createTime";
    const sortDirection = req.query.sortDirection || "asc";
    // const result = await User.find({});
    // res.status(200).send(result);
    const count = await User.countDocuments(filter);
    const { limit, offset } = calculateLimitAndOffset(
      currentPage,
      pageSize > 200 ? 200 : pageSize
    );
    const users = await User.find(filter)
      .limit(limit)
      .skip(offset)
      .sort([[sort, sortDirection]]);
    const meta = paginate(
      currentPage,
      count,
      users,
      pageSize > 200 ? 200 : pageSize
    );
    res.set(meta);
    return res.send(users);
  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.addUser = wrapper(async (req, res) => {
  try {
    const { firstName, lastName, username,email, password, mobile, dataOfBirth, gender, address,
      country,state,city,  pin,
    } = req.body;

    // Check if username or email is already registered
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username is already taken.' });
      } else {
        return res.status(400).json({ message: 'Email is already registered.' });
      }
    }

    const hashedPassword = await hasPass(password);
    const user = new User({
      userId: uuidv4(),firstName,lastName,username,email,password: hashedPassword, mobile,dataOfBirth,
      gender,address,country, state,city,pin,
    });
    
    await user.save(); // Wait for the user to be saved to the database
    res.status(201).send(user); // Send the saved user object as the response with status 201 (Created)

    // sendMail(email,"Welcome To Our Website", `Hi, ${firstName} ${lastName}! Thanks For Registration!`);
  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.deleteAllUser = wrapper(async (req, res) => {
  try {
    const users = await User.deleteMany({});
    if (users.deletedCount > 0)
      console.log("Deleted" + users.deletedCount + " users");
    res.status(204).send("ALL Deleted"); // Send the saved user object as the response
  } catch (err) {
    throw boom.boomify(err);
  }
});
exports.getUserById = wrapper(async (req, res) => {
  try {
    const userSelectedId = req?.params?.userId;
    const user = await User.findOne({ userId: userSelectedId });

    if (!user) {
      throw boom.notFound("No user found with that UserId");
    }
    return res.send(user);
  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.updateUserById = wrapper(async (req, res) => {
  try {
    const userSelectedId = req?.params?.userId;
    const user = await User.findOneAndUpdate({ userId: userSelectedId });

    if (!user) {
      throw boom.notFound("No user found with that UserId");
    }
   
    return res.send(user);
  } catch (err) {
    throw boom.boomify(err);
  }
});
exports.deleteUserById = wrapper(async (req, res) => {
  try {
    const userSelectedId = req?.params?.userId;
    const user = await User.deleteOne({ userId: userSelectedId });

    if (user.deletedCount === 0) {
      throw boom.notFound("No user found with that UserId");
    }
    return res.status(204).send("deleted User");
  } catch (err) {
    throw boom.boomify(err);
  }
});

exports.loginUser = wrapper(async (req, res, next) => {
  console.log(verifyToken)
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      throw boom.notFound('User not found');
    }
    const hashedPassword = await compare(password, user?.password);
    if(!hashedPassword){
      throw boom.unauthorized('Password not matched');
      }

    const payload = {
      username: username,
      password: password
    };
    let name = user?.firstName + " " + user?.lastName
    const token = jwt.sign(payload, options.secretKey, { expiresIn: "3000s" });
    
    res.json({
      token: token,
      name: name
    });
   // sendMail(user?.email,"New Login Detected", `Hi, ${name}  review your login info`)

  } catch (err) {
    return next(err);
  }
});


