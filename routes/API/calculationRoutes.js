const express = require('express');
const calculateRouter = express.Router();
const calculateController = require('../../controllers/calculation');

calculateRouter.get('/', calculateController.getCalculation);

module.exports = calculateRouter;