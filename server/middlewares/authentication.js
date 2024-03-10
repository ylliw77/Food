const { verifyToken } = require("../helpers/auth-user");
const { User } = require("../models");

const verifiedUser = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) {
      throw {
        name: "UNAUTHORIZED",
      };
    }

    const { id } = verifyToken(access_token.replace("Bearer ", ""));

    let user = await User.findByPk(id);

    if (!user) {
      throw { name: "UNAUTHORIZED" };
    }

    req.user = user;
    next();
  } catch (err) {
    next(err)
  }
};

module.exports = verifiedUser;
