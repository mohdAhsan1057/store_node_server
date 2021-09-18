const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderNumber:{
        type: String,
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    totalAmount:{
        type: mongoose.Schema.Types.Decimal128,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Order', orderSchema);