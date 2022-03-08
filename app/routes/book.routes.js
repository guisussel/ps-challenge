module.exports = app => {
    const books = require("../controllers/book.controller");
    var router = require("express").Router();
    // Create a new book
    router.post("/", books.create);
    // Retrieve all book
    router.get("/", books.findAll);
    // Retrieve all published book
    router.get("/published", books.findAllPublished);
    // Retrieve a single book with id
    router.get("/:id", books.findOne);
    // Update a book with id
    router.put("/:id", books.update);
    // Delete a book with id
    router.delete("/:id", books.delete);
    // Create a new book
    router.delete("/", books.deleteAll);
    app.use('/api/books', router);
};