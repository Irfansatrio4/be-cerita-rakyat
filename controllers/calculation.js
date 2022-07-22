const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const math = require('mathjs');

module.exports.getCalculation = async function (req, res) {
  try {
    const dataBudaya = await db.kebudayaan.findAll();
    const dataProvinsi = await db.provinsi.findAll();
    const totalIndividual = await db.kebudayaan.findAll({
      attributes: [[sequelize.fn('count', '*'), 'totalBudaya']],
      include: [
        {
          model: db.provinsi
        }
      ],
      group: ['provinsi.id']
    });

    let arrTotal = [];
    totalIndividual.forEach(item => {
      arrTotal.push(parseInt(item.dataValues.totalBudaya) + 1);
    });

    const stdev = math.std(arrTotal);

    const totalBudaya = dataBudaya.length + 68;
    const totalProvinsi = dataProvinsi.length;
    const average = totalBudaya / totalProvinsi;

    const n = 0.8;
    const low = average - (n * stdev);
    const high = average + (n * stdev);

    const dataCalculate = {
      total: totalBudaya,
      totalProvinsi,
      average,
      stdev,
      low,
      high
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}