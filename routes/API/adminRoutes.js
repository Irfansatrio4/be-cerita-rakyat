const express = require('express');
const adminRouter = express.Router();
const adminController = require('../../controllers/admin');

adminRouter.post('/login', adminController.login);
adminRouter.post('/logout', adminController.logout);
adminRouter.post('/create-pass', adminController.comparePass);

module.exports = adminRouter;