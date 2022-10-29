const mongoose = require("mongoose");

var ToySchema = new mongoose.Schema({
    Name: String,
    Brand: String,
    Image: String,
    Date: Date,
    Gender: String,
    Year: Number,
    Color: String,
    Description: String,
}, {
    versionKey: false, //optional (to remove _v: 0 when add new data)
});

var ToyModel = mongoose.model("Supper Toys", ToySchema, "toyshop");
module.exports = ToyModel;