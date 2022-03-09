module.exports = app => {
    const eBooks = require("../controllers/eBook.controller");
    var router = require("express").Router();
    // Create a new ebook
    router.post("/", eBooks.create);
    // Retrieve all ebook
    router.get("/", eBooks.findAll);
    // Retrieve a single ebook with id
    router.get("/:id", eBooks.findOne);
    // Update a ebook with id
    router.put("/:id", eBooks.update);
    // Delete a ebook with id
    router.delete("/:id", eBooks.delete);
    // Create a new ebook
    router.delete("/", eBooks.deleteAll);
    app.use('/api/eBooks', router);
};