const databaseProvider = "mongodb"
const databaseName = "pureSpectrumCRUD"; //database name
const databaseHost = "12.0.0.1" //localhost
const databasePort = "27017" //default

module.exports = {
  url: `${databaseProvider}://${databaseHost}:${databasePort}/${databaseName}`
};

//exports the URL of the database connection with mongodb (local)