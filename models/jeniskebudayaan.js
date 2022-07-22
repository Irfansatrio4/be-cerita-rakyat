'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jenisKebudayaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     jenisKebudayaan.hasMany(models.kebudayaan)
    }
  }
  jenisKebudayaan.init({
    tipeKebudayaan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jenisKebudayaan',
    timestamps: false
  });
  return jenisKebudayaan;
};