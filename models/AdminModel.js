const mongoose = require("mongoose");

var AdminSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    gender: String,
    image: String,
    dob: Date,
    year: Number,
    description: String,
    graduated: Boolean, //true or false
}, {
    versionKey: false, //optional (to remove _v: 0 when add new data)
});

var AdminModel = mongoose.model("Only Duy Anh Admin", AdminSchema, "admin");
module.exports = AdminModel;