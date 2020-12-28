const mongoose = require("mongoose");
const { Schema } = mongoose;

const Image = new Schema({
name: { type: String },
cart: { type: Array }
});


module.exports = mongoose.model("user", User);