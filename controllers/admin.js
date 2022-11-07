require("dotenv").config({ path: "./.env" });
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.login = async function (req, res) {
  try {
    const admin = await db.admin.findOne({
      where: { userName: req.body.userName },
    });
    if (admin) {
      const password = bcrypt.compareSync(req.body.password, admin.password);
      if (password) {
        const token = await jwt.sign(
          { id: admin.id, userName: admin.userName },
          process.env.SECRET_TOKEN,
          { expiresIn: "1h" }
        );
        res.cookie("jwt", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        return res.status(200).json({
          success: true,
          message: "Login Berhasil",
          data: {
            idAdmin: admin.id,
            userName: admin.userName,
            token,
          },
        });
      }
      return res.status(401).json({
        success: false,
        message: "Username and Password tidak cocok",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Username belum diregister",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message,
    });
  }
};

module.exports.comparePass = async function (req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    return res.status(200).json({
      success: true,
      data: encryptedPassword,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });

  return res.status(200).json({
    success: true,
    message: "Logout Success",
  });
};
