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
  tokenStatus: {
    type: Boolean,
    default: false,
  },
  tokenCreatedAt: {
    type: Number,
    default: null,
  },

});

module.exports = mongoose.model("users", UsersSchema);
