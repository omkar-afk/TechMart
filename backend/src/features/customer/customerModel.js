
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
          required: true,
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
          required: true,
          trim: true,
        },
      });
      
      const Customer = mongoose.model('Customer', customerSchema);
      
      return Customer;
}

