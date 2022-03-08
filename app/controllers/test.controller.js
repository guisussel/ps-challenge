const db = require("../models");
const Test = db.tests;
// Create and Save a new test
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content cannot be empty!" });
        return;
    }
    // Create a test
    const test = new Test({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    // Save test in the database
    test
        .save(test)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while saving the test on database."
            });
        });
};
// Retrieve all tests from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Test.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tests."
            });
        });
};
// Find a single test with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Test.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found test with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving test with id=" + id });
        });
};
// Update a test by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Test.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update test with id=${id}. Maybe test was not found!`
                });
            } else res.send({ message: "Test was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating test with id=" + id
            });
        });
};
// Delete a test with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Test.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete test with id=${id}. Maybe test was not found!`
                });
            } else {
                res.send({
                    message: "Test was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete test with id=" + id
            });
        });
};
// Delete all tests from the database.
exports.deleteAll = (req, res) => {
    Test.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tests were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tests."
            });
        });
};
// Find all published tests
exports.findAllPublished = (req, res) => {
    Test.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tests."
            });
        });
};