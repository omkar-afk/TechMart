const electronicService = require('./service');
const { Success } = require('../../utils/apiResponse');
const createElectronic = async (request, response) => {
    const payload  = request.body;
    const res = await electronicService.createElectronic(payload);
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}

const getElectronicsByType = async (request, response) => {
    const types  = request.query;
    const search = request.params.searchText;
    // console.log("types",types,"search" , search)
    const res = await electronicService.getElectronicsByType(types,search);
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}

module.exports = {
    createElectronic,
    getElectronicsByType
}