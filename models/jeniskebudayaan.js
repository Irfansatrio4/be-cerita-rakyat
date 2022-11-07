"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class jenisKebudayaan extends Model {
    static associate(models) {
      jenisKebudayaan.hasMany(models.kebudayaan);
    }
  }
  jenisKebudayaan.init(
    {
      tipeKebudayaan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "jenisKebudayaan",
      timestamps: false,
    }
  );
  return jenisKebudayaan;
};
