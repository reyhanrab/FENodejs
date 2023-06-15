const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    fullName: {
        type: String
    },
    email: {
        type: String,
    },
});


module.exports = mongoose.model("customer", customerSchema);