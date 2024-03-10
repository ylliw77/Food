const { Cuisine } = require("../models");

async function adminAndStaffOnly(req, res, next) {
  try {
    const { id } = req.params;
    const cuisine = await Cuisine.findByPk(id);
    if(!cuisine){
      throw {name : "NOT_FOUND"}
    }
    if (req.user.role === "admin") {
      next();
    } else if (req.user.role === "staff" && req.user.id === cuisine.authorId) {
        next()
    } else{
        throw {name : "FORBIDDEN"}
    }
  } catch (err) {
    next(err);
  }
}

async function adminOnly(req, res, next){
  try {
    if(req.user.role !== "admin") {
      throw {name : "FORBIDDEN"}
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {adminAndStaffOnly, adminOnly};
