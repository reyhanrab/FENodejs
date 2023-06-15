const express = require("express");
const router = express.Router();

let UsersSchema = require("../../models/users/users");

router.post("/", async (req, res) => {
  const params = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const post = new UsersSchema(params);
  try {
    await post.save();
    res.send({
      status: 200,
      message: "Signup Successfull, Login to continue",
    });
  } catch (err) {
    res.send({
      status: 200,
      message: "Error while signing up",
    });
  }
});

module.exports = router;
