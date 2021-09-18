const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    password: {
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    roleID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    contactID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact"
    },
    imageURL:{
        type:String,
    },
    cnic:{ 
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model('User', userSchema);