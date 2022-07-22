const express = require('express');
const provinsiRouter = express.Router();
const provinsiController = require('../../controllers/provinsi');

provinsiRouter.get('/', provinsiController.getAll);
provinsiRouter.get('/totalbudaya', provinsiController.countBudaya);

module.exports = provinsiRouter;