const express = require("express");
const router = express.Router();
let RolesSchema = require("../../models/roles/roles");

router.get("/", async (req, res) => {
  try {
    let results = await RolesSchema.find().exec();
    res.status(200).json({ status: httpStatus.success, results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting records " + error.message });
  }
});

router.post("/createrole", async (req, res) => {
  const params = {
    name: req.body.name,
    status: req.body.status,
  };
  try {
    let results = await RolesSchema.create(params);
    res.status(200).json({ status: httpStatus.success, message: "Role Added Successfully", results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while creating record " + error.message });
  }
});

module.exports = router;
