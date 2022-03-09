const dbConfig = require("../config/databaseConnector.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url; //get url from app/config/databaseConnector
//set the db entitys
db.books = require("./book.model.js")(mongoose);
db.bookInventorys = require("./bookInventory.model.js")(mongoose);
module.exports = db;