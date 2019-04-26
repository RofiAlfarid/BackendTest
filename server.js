const express = require('express');
const bodyParser = require('body-parser');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

const route = require('./routes/server.route'); // Imports routes for the products
const app = express();


const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/rofi';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// app.use('/products', product);
app.use('/server', route);	

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});