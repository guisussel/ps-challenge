const db = require("../models");
const BookInventory = db.bookInventorys;
const { v4: uuidv4 } = require('uuid');
// Create and Save a new bookInventory
exports.create = (req, res) => {
    // Validate request
    if (!req.body.book) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    // Create a bookInventory
    const bookInventory = new BookInventory({
        id: uuidv4(), //generate a random uuid for each bookInventory item
        book: req.body.book,
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
                message:
                    err.message || "Some error occurred while saving book on database."
            });
        });
};
// Retrieve all bookInventory from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    BookInventory.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bookInventory."
            });
        });
};
// Find a single book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    BookInventory.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found bookInventory with id " + id });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving bookInventory with id=" + id });
        });
};
// Update a bookInventory by the id in the request
exports.update = (req, res) => {
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
                    message: `Cannot update bookInventory with id=${id}. Maybe bookInventory was not found!`
                });
            } else res.send({ message: "bookInventory was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating bookInventory with id=" + id
            });
        });
};
// Delete a book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    BookInventory.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete bookInventory with id=${id}. Maybe bookInventory was not found!`
                });
            } else {
                res.send({
                    message: "bookInventory was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete bookInventory with id=" + id
            });
        });
};
// Delete all books from the database.
exports.deleteAll = (req, res) => {
    BookInventory.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} BookInventorys were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all bookInventory."
            });
        });
};
// Find all books
exports.findAllPublished = (req, res) => {
    BookInventory.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving bookInventory."
            });
        });
};