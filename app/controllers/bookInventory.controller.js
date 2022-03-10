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
    try {
        const bookInventory = await BookInventory.create(req.body);
        return res.status(201).json({
            bookInventory
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
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
                message: `Internal Server Error (500). Error updating bookInventory with id=${id}`
            });
        });
};

//TODO
//-cannot remove a bookInventory with positive inventory;
// Delete a bookInventory with the specified id in the request
exports.delete = async (req, res) => {
    try {

        const bookInventoryId  = req.params.id;
        const deleted = await BookInventory.findByIdAndRemove(bookInventoryId);
        if (deleted) {
            console.log(res.status);
            return res.status(200).send("BookInventory deleted with success");
        }
        throw new Error({ message: `Not Found (404). Cannot delete bookInventory with id=${bookInventoryId}. BookInventory was not found!` });
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

//TODO
//-cannot remove a book with positive inventory;
// Delete all books from the database.
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