# ps-challenge

Respository and code created by Guilherme Sussel for a coding challenge (link below) for PURESPECTRUM 

https://github.com/kgfelix/book-comet-coding-challenge


Languages used: JavaScript 
Technologies/Framework used: NodeJS + MongoDB (mongoose)

NodeJS is a light and easy to implement and deploy server-sided environment (javascript). It's assynchronous, so it does not depends on a response on every request. Also, it has a good scalability.
JavaScript was chosen because of my familiarity with the language for a faster development and finding for help online as well.
MongoDB is a good choice for small projects. Being a non-relational database makes it very easy to deploy and access via code framework (API) or by its interface (Mongoose).


The project structure was made this way:

APP
|__config
|   |__databaseConnector.config.js
|
|__controllers
|   |__book.controller.js
|   |__bookInventory.controller.js
|
|__models
|   |__book.model.js
|   |__bookInventory.model.js
|   |__index.js
|
|__routes
|   |__book.routes.js
|   |__bookInventory.routes.js
|
|__tests
|   |__routes.test.js
|   |__sample.test.js
|
|__node_modules(npm)
|
|__.gitignore
|__package-lock.json
|__package.json
|__README.md
|__server.js



INSTALLATION:
1- clone this repository;
2- run "npm install" on the root directory to install all libraries
3- download and install MongoDB https://www.mongodb.com/try/download/community, later on create a database named "pureSpectrumCRUD" and its collections "books" and "bookInventorys".
4- run "npm start" on the root directory.
It should connect on the database and run on "localhost:8080"

Tests:
To run the pre-made unit tests, after the installation complete, on the root directory run the command "npm test"



.