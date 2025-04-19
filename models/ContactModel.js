// import mongoose
const mongoose = require('mongoose');

// connect with atlas via mongoose
mongoose.connect('mongodb+srv://obaidullahzeb182:obaid123@cluster0.chrpiit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');


// create schema
const contactSchema = mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    address: String 
});

// export model
module.exports = mongoose.model('Contact', contactSchema);