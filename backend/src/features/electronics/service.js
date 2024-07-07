const db = require('../../utils/db');
const {InternalServerError} = require('../../utils/apiResponse');
const e = require('express');
const createElectronic = async (payload) => {
    try{
        const electronic = await db.electronics.create(payload);
        return electronic;
    }catch(e){
        throw new InternalServerError(e.message ||"Error creating electronic");
    }
   
}

const getElectronicsByType = async (types,search) => {  
    try{
        types = [...Object.values(types)]
        const electronics = await db.electronics.find({type:{
            $in:types
        },name:{$regex:search,$options:'i'}});
        return electronics;
    }catch(e){
        throw new InternalServerError(e.message ||"Error creating electronic");
    }
}

module.exports = {
    createElectronic,
    getElectronicsByType
}