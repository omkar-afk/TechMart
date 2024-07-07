const customerRouter = require('express').Router();
const contoller = require('./controller');
const wrap = require('../../utils/wrap');
const {jwtGuard} = require('../../middleware/jwtGaurd');
customerRouter.post(
    '/customer/signup',
    wrap(contoller.signupCustomer)
);

customerRouter.post(
    '/customer/signin',
    wrap(contoller.signinCustomer)
);

customerRouter.post(
    '/customer/address',
    wrap(jwtGuard),
    wrap(contoller.customerAddressAdd)
);



// customerRouter.post(
//     '/customer/auth/google',
//     wrap(contoller.googleAuthCustomer)
// );


// customerRouter.get(
//     '/customer/get',
//     wrap(jwtGuard),
//     wrap(contoller.getCustomer)

// );


module.exports = customerRouter;


