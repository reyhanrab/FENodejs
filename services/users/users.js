const express = require("express");
const router = express.Router();
let UserSchema = require("../models/Users/Users");

router.get("/", (req, res) => {
  UserSchema.find(function (error, results) {
    if (!error) {
      res.send({
        status: 200,
        results: results,
      });
    }
  });
});

router.put("/:id/updateRole", async (req, res) => {
  let emp_id = req.params.id,
    role = req.body.role;
  try {
    let results = await UserSchema.updateOne({ _id: emp_id }, { role: role });
    if (results) {
      res.send({
        status: 200,
        results: results,
        message: "Role updated successfully",
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      message: "Error while updating User Role",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const results = await UserSchema.findByIdAndDelete({ _id: req.body.userId })
    res.status(200).json({ message: "Record deleted successfully", results: results })
  } catch (error) {
    res.status(400).json({ message: "Error while deleting record due to" + error })
  }
})

module.exports = router;
