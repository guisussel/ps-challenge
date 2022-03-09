/*
Create, Modify, Delete, list all books;
List books by authors and publisher;
Add to inventory, remove from inventory.
 */
const db = require("../models");
const BookInventory = db.bookInventorys;
const { v4: uuidv4 } = require('uuid');
// Create and Save a new bookInventory
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Bad Request (400). Fields cannot be empty!" });
        return;
    }
    // Create a bookInventory
    const bookInventory = new BookInventory({
        //id: uuidv4(), //generate a random uuid for each book item --commented for unit testing
        id: req.body.id,
        books: req.body.books,
        quantity: req.body.quantity
    });
    // Save bookInventory in the database
    bookInventory
        .save(bookInventory)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error (500). Error occurred while saving bookInventory on the database."
            });
        });
};
// Retrieve all bookInventory from the database.
exports.findAll = async (req, res) => {
    BookInventory.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Internal Server Error (500). Some error occurred while retrieving bookInventory."
            });
        });
};
// Find a single bookInventory with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    BookInventory.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not Found (404). Not found bookInventory with id " + id });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Internal Server Error (500). Error retrieving bookInventory with id=" + id });
        });
};
// Update a bookInventory by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    BookInventory.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not Found (404). Cannot update bookInventory with id=${id}. Maybe bookInventory was not found!`
                });
            } else res.send({ message: "bookInventory was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal Server Error (500). Error updating bookInventory with id=" + id
            });
        });
};
// Delete a bookInventory with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    BookInventory.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not Found (404). Cannot delete bookInventory with id=${id}. Maybe bookInventory was not found!`
                });
            } else {
                res.send({
                    message: "bookInventory was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Internal Server Error (500). Could not delete bookInventory with id=" + id
            });
        });
};
// Delete all bookInventory from the database.
exports.deleteAll = async (req, res) => {
    BookInventory.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} BookInventorys were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Internal Server Error (500). Some error occurred while removing all bookInventory."
            });
        });
};