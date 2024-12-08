const { Success } = require('../../utils/apiResponse');
const customerService = require('./service');
const signupCustomer = async (request, response) => {
    const payload = request.body;
    const res = await customerService.signupCustomer(payload);
    response.send(new Success(res))
};
const updateCustomer = async (request, response) => {
    const payload = request.body;
    const res = await customerService.updateCustomer(payload);
    response.send(new Success(res))
}
const googleSigninCustomer = async (request, response) => {
    const payload = request.body;
    const res = await customerService.googleSigninCustomer(payload);
    response.send(new Success(res))
};
const signinCustomer = async (request, response) => {
    const payload = request.body;
    const res = await customerService.signinCustomer(payload);
    response.send(new Success(res))
};

const customerAddressAdd = async (request, response) => {
    const payload = request.body;
    const res = await customerService.customerAddressAdd(payload);
    response.send(new Success(res))
}


module.exports = {
    signinCustomer,
    signupCustomer
    ,customerAddressAdd,
    googleSigninCustomer,
    updateCustomer
}
