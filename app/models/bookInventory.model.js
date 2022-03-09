//entity BookInventory
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            //attributes
            id: Number,
            book: String,
            quantity: Number
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const BookInventory = mongoose.model("bookInventory", schema);
    return BookInventory;
};