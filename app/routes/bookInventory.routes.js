module.exports = app => {
    const bookInventorys = require("../controllers/bookInventory.controller");
    var router = require("express").Router();
    // Create a new bookInventory
    router.post("/", bookInventorys.create);
    // Retrieve all bookInventory
    router.get("/", bookInventorys.findAll);
    // Retrieve a single bookInventory with id
    router.get("/:id", bookInventorys.findOne);
    // Update a bookInventory with id
    router.put("/:id", bookInventorys.update);
    // Delete a bookInventory with id
    router.delete("/:id", bookInventorys.delete);
    // Create a new bookInventory
    router.delete("/", bookInventorys.deleteAll);
    app.use('/api/bookInventorys', router);
};