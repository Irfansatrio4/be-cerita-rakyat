var express = require('express');
var apiRouter = express.Router();
const adminRouter = require('./API/adminRoutes');
const budayaRoutes = require('./API/kebudayaanRoutes');
const calculateRouter = require('./API/calculationRoutes');
const provinsiRouter = require('./API/provinsiRoutes');

apiRouter.use('/budaya', budayaRoutes);
apiRouter.use('/provinsi', provinsiRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/total', calculateRouter);

module.exports = apiRouter;
