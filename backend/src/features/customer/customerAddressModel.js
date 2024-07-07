


module.exports = (mongoose) => {

    const CustomerAddressSchema = new mongoose.Schema({
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        isDefault: {
            type: Boolean,
            default: false
        },
        createdOn: {
            type: Date,
            default: Date.now
        },
        updatedOn: {
            type: Date,
            default: Date.now
        }
    });

    const CustomerAddressModel = mongoose.model('CustomerAddress', CustomerAddressSchema);

    return CustomerAddressModel;
}