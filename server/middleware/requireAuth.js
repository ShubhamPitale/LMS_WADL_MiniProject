require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ err: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id }).select('_id');
    req.admin = await User.findOne({ _id }).select('admin');

    if (req.admin) {
      req.isAdmin = true;
    } else {
      req.isAdmin = false;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ err: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
