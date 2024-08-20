const db = require('../../utils/db');
const { hashPassword, comparePassword } = require('../../utils/bcrypt');
const { InternalServerError, AccessRestrictedError } = require('../../utils/apiResponse');
const { generateToken } = require('../../utils/jwt');
const signupCustomer = async (body) => {
    try {
        const { email, password } = body;

        // Check if email already exists
        const existingCustomer = await db.customer.findOne({ email });
        if (existingCustomer) {
            throw new Error('Email already exists');
        }

        // If email doesn't exist, proceed with customer creation
        const hash = await hashPassword(password);
        body.password = hash;
        const customer = await db.customer.create(body);
        const deepCopyCustomer = JSON.parse(JSON.stringify(customer));
        delete deepCopyCustomer.password;
        const jwt = generateToken(deepCopyCustomer)
        return { jwt };
    } catch (e) {
        if (e.message === 'Email already exists') {
            throw new ConflictError('Email already exists');
        }
        console.log(e.message);
        throw new InternalServerError(e.message || "Error creating customer");
    }
};

const signinCustomer = async (body) => {
    try {
        const { password } = body;
        const customer = await db.customer.findOne({ email: body.email });
        const result = await comparePassword(password, customer.password);
        if (result===false) {
            throw new AccessRestrictedError("Invalid Password");
        } else {
            const deepCopyCustomer = JSON.parse(JSON.stringify(customer));
            delete deepCopyCustomer.password;
            const jwt = generateToken(deepCopyCustomer)
            return {jwt};
        }
    } catch(e) {
        if(e instanceof AccessRestrictedError){ 
            throw e;
        }
        throw new InternalServerError("Error Signin customer");
    }
};

const customerAddressAdd = async (body) => {
    try {
        const customerAddress = await db.customerAddress.create(body);
        return customerAddress;
    } catch(e) {

        console.log(e);
        throw new InternalServerError(e.message || "Error creating customer address");
    }
}

module.exports = {
    signupCustomer,
    signinCustomer,
    customerAddressAdd
}