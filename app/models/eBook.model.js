module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: Number,
            name: String,
            authors: String,
            publisher: String,
            yearOfPublication: Number,
            summary: String,
            format: String
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const EBook = mongoose.model("eBook", schema);
    return EBook;
};