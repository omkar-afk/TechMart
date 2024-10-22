const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    electronicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'electronics',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = {Image};