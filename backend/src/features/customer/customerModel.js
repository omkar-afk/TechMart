
module.exports = (mongoose)=>{

    const customerSchema = new mongoose.Schema({
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
        password: {
          type: String,
          required: false,
          
        },
        googleLogin: {
          type: Boolean,
          required: false,
          default: false,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          lowercase: true,
        },
        phoneNumber: {
          type: Number,
          required: false,
          trim: true,
        },
      });
      
      const Customer = mongoose.model('Customer', customerSchema);
      
      return Customer;
}

