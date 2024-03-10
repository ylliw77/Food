const { sign, verify } = require("jsonwebtoken");

const userSignIn = (user) => {
  return sign(user, process.env.SECRET);
};

const verifyToken = (token) => {
  return verify(token, process.env.SECRET);
};

module.exports = { userSignIn, verifyToken };
