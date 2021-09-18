require('dotenv').config();
const express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const db = require('./models');
var cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());

const port = process.env.PORT || 3000;

var database = db.mongoose.connect(process.env.MongoURL, { 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
});
database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});
database.once("open", () => {
    initial();
    console.log("Connected to Database");
});


app.use('/api', routes);
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.get('/', (request, response) => {
    res.send("welcome to store server");
});
app.listen(port, () => {
    console.log("app is listening on", port);
});

function initial(){
    db.role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
          new db.role({
            name: "user"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log("added 'user' to roles collection");
          });
    
          new db.role({
            name: "admin"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log("added 'admin' to roles collection");
          });
          new db.role({
            name: "vender"
          }).save(err => {
            if (err) {
              console.log("error", err);
            }
            console.log("added 'vender' to roles collection");
          });
        }
    });
}