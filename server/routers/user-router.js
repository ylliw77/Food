const routeUser = require("express").Router();
const UserController = require("../controllers/controller_user");
const verifiedUser = require("../middlewares/authentication");
const {adminOnly} = require("../middlewares/authorization");

routeUser.post("/login", UserController.loginUser);
routeUser.post("/register", UserController.registerUser);
routeUser.post(
  "/add-user",
  verifiedUser,
  adminOnly,
  UserController.addStaff
);

module.exports = routeUser;
