const apiRouter = require('express').Router();
const customerRouter = require('./features/customer/routes');
const electronicRouter = require('./features/electronics/routes');
const uploadRouter = require('./features/uploads/route');
apiRouter.use('/',customerRouter);
apiRouter.use('/',electronicRouter);
apiRouter.use('/',uploadRouter);
module.exports = apiRouter;