const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    gender: String,
    image: String,
    dob: Date,
    year: Number,
    description: String,
    vip: Boolean, //true or false
}, {
    versionKey: false, //optional (to remove _v: 0 when add new data)
});

var UserModel = mongoose.model("Everyone can be a User", UserSchema, "user");
module.exports = UserModel;