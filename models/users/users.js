const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  tokenStatus: {
    type: Boolean,
    default: false,
  },
  tokenCreatedAt: {
    type: Number,
    default: null,
  },
  status: {
    type: String,
    default: "INACTIVE",
  },
});

module.exports = mongoose.model("users", UsersSchema);
