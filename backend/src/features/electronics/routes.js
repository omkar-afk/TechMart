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
    wrap(controller.getElectronicsByType));

electronicRouter.get(
        '/electronics/get',
        wrap(controller.getElectronics));
electronicRouter.get(
        '/electronics/getSuggestion/:searchText',
        wrap(controller.getElectronicsBySuggestion));
        electronicRouter.get(
            '/electronics/post/add',
            wrap(controller.postadd));
    
module.exports = electronicRouter;