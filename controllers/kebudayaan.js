const { Op } = require("sequelize");
const getCursorData = require("../helpers/getCursorData.js");
const parseSequelizeOptions = require("../helpers/parseSequelizeOptions.js");
const db = require("../models/index.js");
const { deleteCloudPicture } = require("../helpers/cloudinary");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.kebudayaan.findAll({
      attributes: ["id", "namaBudaya"],
      include: [
        {
          model: db.provinsi,
          attributes: ["namaProvinsi"],
        },
      ],
      order: [["id", "ASC"]],
    });
    return res.status(200).json({
      sucess: true,
      data: allData,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.getBudayaAll = async function (req, res) {
  try {
    const options = parseSequelizeOptions(req.query);
    options.include = [
      {
        model: db.jenisKebudayaan,
        attributes: ["tipeKebudayaan"],
      },
      {
        model: db.provinsi,
        attributes: ["namaProvinsi"],
      },
    ];
    options.order = [["id", "DESC"]];
    const budaya = await db.kebudayaan.findAll(options);

    const cursor = await getCursorData(db.kebudayaan, req.query);

    return res.status(200).json({
      sucess: true,
      data: budaya,
      cursor,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.getListBudaya = async function (req, res) {
  const id = req.params.id;
  try {
    const list = await db.kebudayaan.findAll({
      attributes: ["id", "namaBudaya"],
      where: {
        [Op.or]: [{ provinsiId: id }, { provinsiId: 35 }],
      },
      order: [["namaBudaya", "ASC"]],
    });
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Budaya Not Found",
      });
    }
    return res.status(200).json({
      sucess: true,
      data: list,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.getBudayaDetail = async function (req, res) {
  try {
    const budaya = await db.kebudayaan.findByPk(req.params.id, {
      attributes: [
        "id",
        "no_regis",
        "namaBudaya",
        "deskripsi",
        "tahun",
        "gambar",
        "video",
      ],
      include: [
        {
          model: db.jenisKebudayaan,
          attributes: ["tipeKebudayaan"],
        },
        {
          model: db.provinsi,
          attributes: ["namaProvinsi"],
        },
      ],
    });
    if (!budaya) {
      return res.status(404).json({
        success: false,
        message: "Budaya not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      data: budaya,
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.createBudaya = async function (req, res) {
  console.log("hit");
  const { namaBudaya, tahun, deskripsi, jenisKebudayaanId, provinsiId } =
    req.body;

  const updateData = {
    namaBudaya,
    tahun,
    deskripsi,
    jenisKebudayaanId,
    provinsiId,
  };

  if (req.file) updateData.image = req.file.path;

  try {
    // check if name exist
    const existBudaya = await db.kebudayaan.findOne({ where: { namaBudaya } });
    if (existBudaya) {
      return res.status(409).json({
        success: false,
        message: "Budaya sudah ada",
      });
    }

    const updatedData = await db.kebudayaan.create(updateData);

    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "Budaya added!",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.updateBudayaById = async function (req, res) {
  try {
    const { id } = req.params;
    const { namaBudaya, provinsiId, tahun, deskripsi } = req.body;

    const editData = {
      namaBudaya,
      provinsiId,
      tahun,
      deskripsi,
    };

    if (req.file) editData.image = req.file.path;

    const editedData = await db.kebudayaan.findByPk(id);

    if (!editedData) {
      return res.status(404).json({
        sucess: false,
        message: "Budaya not found!",
      });
    }

    editedData.update(editData);

    return res.status(200).json({
      success: true,
      data: editedData,
      message: "Edit Success",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.deleteBudayaById = async function (req, res) {
  try {
    const { id } = req.params;

    const deletedData = await db.kebudayaan.findByPk(id);

    if (!deletedData) {
      return res.status(404).json({
        sucess: false,
        message: "Budaya not found!",
      });
    }

    if (deletedData.image) deleteCloudPicture(deletedData.image);

    await deletedData.destroy();

    return res.status(200).json({
      success: true,
      data: deletedData,
      message: "Sucess delete Budaya",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.initialId = async function (req, res) {
  try {
    const Budaya = await db.kebudayaan.findAll();
    await db.sequelize.query(
      `ALTER SEQUENCE "kebudayaans_id_seq" RESTART WITH ${Budaya.length + 1};`
    );
    return res.status(200).json({
      success: true,
      message: "success",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};
