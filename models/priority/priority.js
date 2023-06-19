const mongoose = require("mongoose");

const PrioritySchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    default: "ACTIVE",
  },
});

module.exports = mongoose.model("priority", PrioritySchema);
