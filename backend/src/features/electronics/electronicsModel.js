
const { UploadError } = require('../../utils/apiResponse');
const { ELECTRONICS_TYPE } = require('../../utils/constant');
module.exports = (mongoose) =>{
    const electronicsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum:[...Object.values(ELECTRONICS_TYPE)]
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        customerAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CustomerAddress',
            required: true
        },
        status:{
            type: String,
            required: true,
            enum: ['available','sold'],
            default: 'available'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    });
    const electronicsModel = mongoose.model('electronics', electronicsSchema);
    return electronicsModel;
}