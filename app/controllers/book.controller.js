/*
Create, Modify, Delete, list all books;
List books by authors and publisher;
Add to inventory, remove from inventory.
 */
const db = require("../models");
const Book = db.books;
const { v4: uuidv4 } = require('uuid');

// Create and Save a new book
exports.create = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(201).json({
            book
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Retrieve all books from the database.
exports.findAll = async (req, res) => {
    Book.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Internal Server Error (500). Error occurred while fetching books from the database."
            });
        });
};

// Find a single book with an id
exports.findOne = async (req, res) => {
    const id = req.params.id;
    Book.findById(id).then(data => {
        if (!data)
            res.status(404).send({ message: "Bad Request (400). Not found book with id " + id });
        else res.send(data);
    }).catch(err => {
        res.status(500).send({ message: "Internal Server Error (500). Error retrieving book with id=" + id });
    });
};

// Update a book by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Bad Request (400). Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Not Found (404). Cannot update book with id=${id}. Maybe book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating book with id= + ${id}`
            });
        });
};

//TODO
//-cannot remove a book with positive inventory;
// Delete a book with the specified id in the request
exports.delete = async (req, res) => {
    try {

        const bookId  = req.params.id;
        const deleted = await Book.findByIdAndRemove(bookId);
        if (deleted) {
            return res.status(200).send("Book deleted with success");
        }
        throw new Error({ message: `Not Found (404). Cannot delete book with id=${bookId}. Book was not found!` });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

//TODO
//-cannot remove a book with positive inventory;
// Delete all books from the database.
exports.deleteAll = async (req, res) => {
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