const apiRouter = require('express').Router();
const customerRouter = require('./features/customer/routes');
const electronicRouter = require('./features/electronics/routes');
apiRouter.use('/',customerRouter);
apiRouter.use('/',electronicRouter);

module.exports = apiRouter;