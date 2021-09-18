const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    phone_no:{
        type: String,
        // unique: true,
    },
    mobile_no:{
        type: String,
        // unique: true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Contact', contactSchema);