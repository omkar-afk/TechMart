const db = require('../../utils/db');
const { hashPassword, comparePassword } = require('../../utils/bcrypt');
const { InternalServerError, AccessRestrictedError } = require('../../utils/apiResponse');
const { generateToken } = require('../../utils/jwt');
const signupCustomer = async (body) => {
    try {
        const { email, password } = body;
        // Check if email already exists
        const existingCustomer = await db.customer.findOne({ email});
        console.log(existingCustomer);
        if (existingCustomer && existingCustomer.password) {
            throw new AccessRestrictedError('Email already exists');
        }
        const hash = await hashPassword(password);
        body.password = hash;
        let customer;
        
        if(existingCustomer && !existingCustomer.password){
            customer = await db.customer.findOneAndUpdate({ email }, {password:body.password});
        }
        customer = await db.customer.create(body);
        const deepCopyCustomer = JSON.parse(JSON.stringify(customer));
        if(deepCopyCustomer.password){
            deepCopyCustomer.password = true;
        }

        const jwt = generateToken(deepCopyCustomer)
        return { jwt };
    } catch (e) {
        if (e.message === 'Email already exists') {
            throw new AccessRestrictedError('Email already exists');
        }
        console.log(e.message);
        throw new InternalServerError(e.message || "Error creating customer");
    }
};

//dfind the customer by email

const updateCustomer = async (body) => {
    try {
        const { _id, ...main } = body;
        const {currentpassword, password} = main;
        if(main.currentpassword){
            const customer = await db.customer.findOne({_id});
            const result = await comparePassword(customer.password, currentpassword);

            if(result===false){
                throw new AccessRestrictedError("Invalid Password");
            }
            main.password = await hashPassword(password);
        }
        let customer = await db.customer.findOneAndUpdate
        ({_id}, main).lean();
        customer = await db.customer.findOne({_id}).lean();
        console.log(customer);
        const jwt = generateToken(customer)

        return {jwt};
    }
    catch (e) {
        console.log(e.message);
        if(e instanceof AccessRestrictedError){
            throw e;
        }
        throw new InternalServerError("Error updating customer");
    }
}
//create a google signin customer
const googleSigninCustomer = async (body) => {
    try {
        const { email } = body;
        let customer = await db.customer.findOne({ email });
        console.log(customer);
        if (!customer) {
            customer = await db.customer.create(body);
        }
        console.log(customer);
        const deepCopyCustomer = JSON.parse(JSON.stringify(customer));
        if(deepCopyCustomer.password){
            deepCopyCustomer.password = true;
        }
        console.log(deepCopyCustomer);
        const jwt = generateToken(deepCopyCustomer)
        console.log(jwt);
        return { jwt };
    } catch (e) {
        if (e instanceof AccessRestrictedError) {
            throw e;
        }
        throw new InternalServerError("Error Signin customer");
    }
}
const signinCustomer = async (body) => {
    try {
        const { password } = body;
        const customer = await db.customer.findOne({ email: body.email });
        if (!customer) {
            throw new AccessRestrictedError("Customer not found for Email");
        }
        if (customer.password === undefined) {
            throw new AccessRestrictedError("Customer is signed up with Google");
        }
        const result = await comparePassword(password, customer.password);
        if (result===false) {
            throw new AccessRestrictedError("Invalid Password");
        } else {
            const deepCopyCustomer = JSON.parse(JSON.stringify(customer));
            if(deepCopyCustomer.password){
                deepCopyCustomer.password = true;
            }
            const jwt = generateToken(deepCopyCustomer)
            return {jwt};
        }
    } catch(e) {
        console.log(e.message); 
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

const getUserElectronics = async()=>{
    try{
      const imagesData = await db.images.find().populate('electronicId');
      const myMap = new Map();
      // console.log("images", imagesData);
      
      imagesData.forEach(image => {
        if (!myMap.has(image.electronicId)) {
          myMap.set(image.electronicId, [{ url: image.url,_id:image._id }]);
        }
      });
      //traverse the map
      let images = [];
      for (let [key, value] of myMap) {
        if(key != null){
        let electronic = key.toObject();
        electronic.images = value[0];
        images.push(electronic);
        }
      } 
  return images;
    }catch(e){
      throw new InternalServerError(e.message ||"Error creating electronic");
    }
  }

module.exports = {
    signupCustomer,
    signinCustomer,
    customerAddressAdd,
    getUserElectronics,
    googleSigninCustomer,
    updateCustomer
}