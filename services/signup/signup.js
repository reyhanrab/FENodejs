const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

let UsersSchema = require("../../models/users/users");

router.post("/", async (req, res) => {
  const userObj = req.body.data;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashPass;

  const post = new UsersSchema(userObj);

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
