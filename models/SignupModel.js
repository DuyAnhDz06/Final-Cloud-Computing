const mongoose = require("mongoose");

var signupSchema = new mongoose.Schema({
    Password: String,
    Email: String,
    
}, {
    versionKey: false, //optional (to remove _v: 0 when add new data)
});

var signupModel = mongoose.model("Only Duy Anh signup", signupSchema, "signup");
module.exports = signupModel;