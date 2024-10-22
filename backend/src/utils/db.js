const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

const db = {};
db.mongoose = mongoose;
db.customer = require('../features/customer/customerModel')(mongoose);
db.electronics = require('../features/electronics/electronicsModel')(mongoose);
db.customerAddress = require('../features/customer/customerAddressModel')(mongoose);
db.images = require('../features/electronics/imagesModel').Image
module.exports = db;