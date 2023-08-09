const express = require("express");
const router = express.Router();
let UsersSchema = require("../../models/users/users");
const httpStatus = require("../../constants/httpStatus");

router.patch("/", async (req, res) => {
  const emp_id = req.body.userId;
  const updateDataObj = {};
  updateDataObj.tokenStatus = false;
  updateDataObj.tokenCreatedAt = null;
  try {
    await UsersSchema.updateOne({ _id: emp_id }, updateDataObj).exec();
    res.clearCookie("authtoken");
    res.status(200).json({ status: httpStatus.success, message: "Logged out Successfully" });
  } catch (error) {
    res.status(200).json({ status: httpStatus.failure, message: `Error while logging out due to ${error}` });
  }
});

module.exports = router;
