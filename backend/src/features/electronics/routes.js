const electronicRouter = require('express').Router();
const wrap = require('../../utils/wrap');
const controller = require('./controller');
const {jwtGuard} = require('../../middleware/jwtGaurd');
electronicRouter.post(
    '/electronics/create',
    wrap(jwtGuard),
    wrap(controller.createElectronic));


// electronicRouter.get(
//     '/electronics/get/:type',
//     wrap(jwtGuard),
//     wrap(controller.getElectronicsByType));

electronicRouter.get(
    '/electronics/get/:searchText',
    wrap(jwtGuard),
    wrap(controller.getElectronicsByType));
module.exports = electronicRouter;