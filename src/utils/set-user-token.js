const jwt = require('jsonwebtoken');

exports.setUserToken = (res, user) => {
  const payload = {
    _id: user._id,   
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin  
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.cookie('token', token);
};
