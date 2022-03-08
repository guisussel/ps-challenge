module.exports = app => {
    const tests = require("../controllers/test.controller");
    var router = require("express").Router();
    // Create a new test
    router.post("/", tests.create);
    // Retrieve all tests
    router.get("/", tests.findAll);
    // Retrieve all published tests
    router.get("/published", tests.findAllPublished);
    // Retrieve a single test with id
    router.get("/:id", tests.findOne);
    // Update a test with id
    router.put("/:id", tests.update);
    // Delete a test with id
    router.delete("/:id", tests.delete);
    // Create a new test
    router.delete("/", tests.deleteAll);
    app.use('/api/tests', router);
};