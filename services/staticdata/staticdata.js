const express = require("express");
const router = express.Router();
let StatusSchema = require("../../models/status/status");
let PrioritySchema = require("../../models/priority/priority");
let httpStatus = require("../../constants/httpStatus");

router.get("/status", async (req, res) => {
  try {
    let results = await StatusSchema.find().exec();
    res.status(200).json({ status: httpStatus.success, results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting records " + error.message });
  }
});

router.get("/priority", async (req, res) => {
  try {
    let results = await PrioritySchema.find().exec();
    res.status(200).json({ status: httpStatus.success, results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting records " + error.message });
  }
});

module.exports = router;
