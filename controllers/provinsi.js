const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.provinsi.findAll();

    return res.status(200).json({
      sucess: true,
      data: allData
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.countBudaya = async function (req, res) {
  try {
    const dataBudaya = await db.kebudayaan.findAll({
      attributes: [[sequelize.fn('count', '*'), 'totalBudaya'], 'provinsiId'],
      include: [
        {
          model: db.provinsi
        }
      ],
      group: ['provinsi.id', 'kebudayaan.provinsiId'],
      order: [['provinsiId', 'ASC']]
    })

    return res.status(200).json({
      sucess: true,
      data: dataBudaya
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}