const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  owner: {
    type: String,
  },
  status: {
    type: String,
  },
  historical: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("projects", projectSchema);
