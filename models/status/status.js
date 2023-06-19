const mongoose = require("mongoose");

const StatusSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    default: "ACTIVE",
  },
});

module.exports = mongoose.model("status", StatusSchema);
