const jwt = require("jsonwebtoken");
require("dotenv").config()
const secret = process.env.SECRET;
const setUser = (user) => {
  try {
    return jwt.sign(
      {
        _id: user._id,
        email: user.email,
        role : user.role,
      },
      secret
    );
  } catch (error) {
    console.log(error);
  }
};
const getUser = (token) => {
  if (!token) {
    return null;
  }
  try {
  return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
module.exports = {
  setUser,
  getUser,
};
