"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    static associate(models) {}
  }
  admin.init(
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin",
      timestamps: false,
    }
  );
  return admin;
};
