const db = require('../models');
const jwt = require('jsonwebtoken');


// for development only
// getUsers
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.User.find();
    return res.status(200).json(users);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

exports.getUsersbyId = async (req, res, next) => {
  try {
    const {id} = req.decoded;
    const users = await db.User.findById(id).populate("subjects");
    return res.status(200).json(users);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// register a user
exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const { id, email } = user;
    const token = jwt.sign({ id, email }, process.env.SECRET);

    return res.status(201).json({
      id,
      email,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = 'Sorry, that username is already taken';
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};

// login a user
exports.login = async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      email: req.body.email,
    });
    const { id, email } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({ id, email }, process.env.SECRET);
      return res.status(200).json({
        id,
        email,
        token,
      });
    } else {
      throw new Error();
    }
  } catch (err) {
    return next({ status: 404, message: 'Invalid Email/Password' });
  }
};
