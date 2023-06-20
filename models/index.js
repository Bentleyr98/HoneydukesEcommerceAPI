// This file contains our mongoose connection and db information

const dbconfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbconfig.url;
db.orders = require('./orders.js')(mongoose);
db.products = require('./products.js')(mongoose);
db.reviews = require('./reviews.js')(mongoose);
db.users = require('./users.js')(mongoose);

module.exports = db;
