const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description: {
        type: String,
    },
    quantity:{
        type: Number,
    },
    categoryID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    storeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    imageURL:{
        type:String,
    },
    price:{ 
        type: mongoose.Schema.Types.Decimal128,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Product', productSchema);