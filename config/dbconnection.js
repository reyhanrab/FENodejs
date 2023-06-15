const mongoose = require("mongoose");

function connect(){
  mongoose
    .connect(
      "mongodb+srv://reyhanrab:NeedforSpeed@cluster0.ufcfhbz.mongodb.net/Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("connected to MongoDB.."))
    .catch((err) => console.error("could not connect to mongoDB", err));
};
module.exports = connect;
