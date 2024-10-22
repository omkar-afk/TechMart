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
    const res = await electronicService.getElectronicsByType(types,search);
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}
const getElectronics = async (request , response)=> {
    // console.log("types",types,"search" , search)
    const res = await electronicService.getElectronics();
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}
const getElectronicsBySuggestion   = async (request, response) => {
    const search = request.params.searchText;
    // console.log("types",types,"search" , search)
    const res = await electronicService.getElectronicsBySuggestion(search);
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}

const postAdd   = async (request, response) => {

    const res = await electronicService.postAdd(request);
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}

const getElectronicsById = async (request, response) => {
    const id = request.params.id;
    const res = await electronicService.getElectronicsById(id);
    const responsePayload = JSON.parse(JSON.stringify(res));
    response.send(new Success(responsePayload));
}
module.exports = {
    createElectronic,
    getElectronicsByType,
    getElectronicsBySuggestion,
    getElectronics,
    postAdd,
    getElectronicsById
    
}