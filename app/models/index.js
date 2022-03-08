const dbConfig = require("../config/databaseConnector.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tests = require("./test.model.js")(mongoose);
module.exports = db;