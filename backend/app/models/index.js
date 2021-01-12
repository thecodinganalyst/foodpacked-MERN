const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = "mongodb://localhost/test";
db.foodItems = require("./foodItemModel.js")(mongoose);

module.exports = db;
