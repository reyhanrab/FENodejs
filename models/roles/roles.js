const mongoose = require("mongoose");

const RolesSchema = mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    default: "ACTIVE",
  },
});

module.exports = mongoose.model("roles", RolesSchema);
