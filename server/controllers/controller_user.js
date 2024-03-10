const { userSignIn } = require("../helpers/auth-user");
const { comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models");

class UserController {
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      const validUser = await User.findOne({
        where: { email },
      });
      if (!validUser || !comparePassword(password, validUser.password)) {
        throw {
          name: "USER_NOT_FOUND",
          message: "Invalid email/password",
        };
      }

      const payload = { id: validUser.id, email: validUser.email };
      const access_token = userSignIn(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }

  static async registerUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const newUser = await User.create({
        email,
        password,
        phoneNumber,
        address,
        role: "admin",
      });

      res
        .status(201)
        .json({ id: newUser.id, email: newUser.email, role: newUser.role });
    } catch (err) {
      next(err);
    }
  }

  static async addStaff(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const newStaff = await User.create({
        email,
        password,
        phoneNumber,
        address,
        role: "staff",
      });

      res.status(201).json(`Success adding new staff with id ${newStaff.id}`);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
