const express = require("express");
const router = express.Router();
let UserSchema = require("../../models/users/users");
const httpStatus = require("../../constants/httpStatus");

router.get("/", async (req, res) => {
  try {
    let results = await UserSchema.find().exec();
    res.status(200).json({ status: httpStatus.success, results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting records " + error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let results = await UserSchema.findByIdAndUpdate({ _id: req.params.id }, req.body.data, { new: true }).exec();
    if (results) {
      res.status(200).json({ status: httpStatus.success, message: "User updated successfully", results: results });
    }
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while updating user" + error.message });
  }
});

router.post("/", async (req, res) => {
  const post = new UserSchema(req.body.data);
  try {
    await post.save();
    res.status(200).json({ status: httpStatus.success, message: "User Added successfully" });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting records " + error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const results = await UserSchema.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Record deleted successfully", results: results });
  } catch (error) {
    res.status(400).json({ message: "Error while deleting record due to" + error });
  }
});

module.exports = router;
