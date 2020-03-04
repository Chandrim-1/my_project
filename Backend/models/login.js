const mongoose = require("mongoose");
const Schema= mongoose.Schema;
var logInSchema=new Schema({
    email: String,
    password: String
})
//create model
const User = mongoose.model("login", logInSchema);
module.exports = {
    user: User
};