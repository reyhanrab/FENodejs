const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  start_date: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  owner: {
    type: String,
  },
  status: {
    type: String,
    default: "Active",
  },
});

module.exports = mongoose.model("projects", projectSchema);
