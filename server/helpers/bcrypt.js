const { hashSync, compareSync } = require("bcryptjs");

const hashPassword = (password) => hashSync(password);
const comparePassword = (password, hashedPassword) =>
  compareSync(password, hashedPassword);

module.exports = {
  hashPassword,
  comparePassword,
};
