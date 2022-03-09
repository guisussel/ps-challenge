const db = require("../models");
const EBook = db.eBooks;
const { v4: uuidv4 } = require('uuid');
// Create and Save a new book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    // Create a book
    const eBook = new EBook({
        //id: uuidv4(), //generate a random uuid for each book item --commented for unit testing
        id: req.body.id,
        name: req.body.name,
        authors: req.body.authors,
        publisher: req.body.publisher,
        yearOfPublication: req.body.yearOfPublication,
        summary: req.body.summary,
        format: req.body.format
    });
    // Save book in the database
    eBook
        .save(eBook)
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
    EBook.find(condition)
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
    EBook.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Ebook with id " + id });
        else res.send(data);
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Ebook with id=" + id });
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
    EBook.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Ebook with id=${id}. Maybe book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ebook with id=" + id
            });
        });
};
// Delete a book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    EBook.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Ebook with id=${id}. Maybe book was not found!`
                });
            } else {
                res.send({
                    message: "EBook was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ebook with id=" + id
            });
        });
};
// Delete all books from the database.
exports.deleteAll = (req, res) => {
    EBook.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} EBooks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Ebooks."
            });
        });
};
// Find all books
exports.findAllPublished = (req, res) => {
    EBook.find({ published: true })
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