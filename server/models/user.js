"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cuisine, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already exist",
        },
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          notNull: {
            msg: "Email is required",
          },
          isEmail : {
            msg : "Invalid email format"
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          notNull: { msg: "Password is required" },
          isPasswordLength(value) {
            if (this.password.length <= 5 && this.password.length !== 0) {
              throw new Error("Password characters must be greater than 5");
            }
          },
        },
      },
      role: { type: DataTypes.STRING, defaultValue: "staff" },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        async beforeCreate(user, options) {
          const hashedPassword = await hashPassword(user.password);
          user.password = hashedPassword;
        },
      },
      modelName: "User",
    }
  );

  return User;
};
