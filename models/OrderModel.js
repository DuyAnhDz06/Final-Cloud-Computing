const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    zip: Number,
    city: String,
    state: String,
    country: String,
    remarks: String, //description
}, {
    versionKey: false, //optional (to remove _v: 0 when add new data)
});

var orderModel = mongoose.model("Everyone can be a order", orderSchema, "order");
module.exports = orderModel;