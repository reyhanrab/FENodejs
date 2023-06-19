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

router.put("/:id/updateRole", async (req, res) => {
  let employeeId = req.params.employeeId,
    roleId = req.body.roleId;
  try {
    let results = await UserSchema.updateOne({ _id: employeeId }, { role: roleId }).exec();
    if (results) {
      res.status(200).json({ status: httpStatus.success, message: "Role updated successfully", results: results });
    }
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while updating user role " + error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const results = await UserSchema.findByIdAndDelete({ _id: req.body.userId });
    res.status(200).json({ message: "Record deleted successfully", results: results });
  } catch (error) {
    res.status(400).json({ message: "Error while deleting record due to" + error });
  }
});

module.exports = router;
