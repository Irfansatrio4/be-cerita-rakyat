'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kebudayaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      kebudayaan.belongsTo(models.provinsi);
      kebudayaan.belongsTo(models.jenisKebudayaan);
    }
  }
  kebudayaan.init({
    no_regis: DataTypes.INTEGER,
    namaBudaya: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    tahun: DataTypes.INTEGER,
    gambar: DataTypes.STRING,
    provinsiId: DataTypes.INTEGER,
    jenisKebudayaanId: DataTypes.INTEGER,
    video: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'kebudayaan',
    timestamps: false
  });
  return kebudayaan;
};