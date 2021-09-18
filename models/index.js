const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./models/userModel");
db.role = require("./models/roleModel");
db.category = require('./models/categoryModel');
db.order = require('./models/orderModel');
db.product = require('./models/productModel');
db.store = require('./models/storeModel');
db.contact = require('./models/contactModel');

db.ROLES = ["user", "admin", "vender"];

module.exports = db;