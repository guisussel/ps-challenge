module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: String,
            name: String,
            authors: String,
            publisher: String,
            yearOfPublication: Number,
            summary: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const Book = mongoose.model("book", schema);
    return Book;
};