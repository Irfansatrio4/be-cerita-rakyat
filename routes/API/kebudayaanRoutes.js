const express = require('express');
const multer = require('multer');
const budayaRouter = express.Router();
const budayaController = require('../../controllers/kebudayaan');
const auth = require('../../middleware/auth');
const { getStorage } = require('../../helpers/cloudinary');

const maxSize = 2*1024*1024; //2 MB

const storage = getStorage('budaya');
const upload = multer({ 
    storage,
    limits: { fileSize: maxSize }
});

budayaRouter.get('/value', budayaController.initialId);
budayaRouter.get('/', budayaController.getAll);
budayaRouter.get('/all', auth.checkLogin, budayaController.getBudayaAll);
budayaRouter.post('/create', auth.checkLogin,upload.single("image"), budayaController.createBudaya); 
budayaRouter.get('/detail/:id', budayaController.getBudayaDetail);
budayaRouter.put('/update/:id', auth.checkLogin,upload.single("image"), budayaController.updateBudayaById); 
budayaRouter.delete('/delete/:id', auth.checkLogin, budayaController.deleteBudayaById); 
budayaRouter.get('/list/:id', budayaController.getListBudaya);

module.exports = budayaRouter;