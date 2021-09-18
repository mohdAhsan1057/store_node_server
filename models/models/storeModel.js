const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description:{
        type: String,
    },
    imageURL:{
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('Store', storeSchema);