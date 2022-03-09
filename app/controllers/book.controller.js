const db = require("../models");
const Book = db.books;
const { v4: uuidv4 } = require('uuid');
// Create and Save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    // Create a book
    const book = new Book({
        //id: uuidv4(), //generate a random uuid for each book item --commented for unit testing
        id: req.body.id,
        name: req.body.name,
        authors: req.body.authors,
        publisher: req.body.publisher,
        yearOfPublication: req.body.yearOfPublication,
        summary: req.body.summary
    });
    // Save book in the database
    book
        .save(book)
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
// Retrieve all books from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};
// Find a single book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Book.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found book with id " + id });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving book with id=" + id });
        });
};
// Update a book by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update book with id=${id}. Maybe book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating book with id=" + id
            });
        });
};
// Delete a book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Book.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete book with id=${id}. Maybe book was not found!`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete book with id=" + id
            });
        });
};
// Delete all books from the database.
exports.deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Books were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all books."
            });
        });
};
// Find all books
exports.findAllPublished = (req, res) => {
    Book.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving books."
            });
        });
};