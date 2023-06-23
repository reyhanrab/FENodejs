const express = require("express");
const router = express.Router();
let ProjectsSchema = require("../../models/projects/projects");
let httpStatus = require("../../constants/httpStatus");

router.get("/", async (req, res) => {
  try {
    const results = await ProjectsSchema.find().exec();
    res.status(200).json({ status: 200, results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting records due to" + error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const results = await ProjectsSchema.findById({ _id: req.params.id }).exec();
    res.status(200).json({ status: 200, results: results });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while getting record due to" + error });
  }
});

router.post("/", async (req, res) => {
  const params = req.body.data;
  try {
    const data = await ProjectsSchema.create(params);
    res.status(200).json({ status: httpStatus.success, message: "Project added successfully", results: data });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Unable to create project due to " + error.message });
  }
});

router.delete("/multiple", async (req, res) => {
  try {
    await ProjectsSchema.deleteMany({ userId: req.app.locals.userId }, { _id: req.body.projectIds }).exec();
    res.status(200).json({ status: httpStatus.success, message: "Records deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while deleting records due to" + error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await ProjectsSchema.findByIdAndDelete({ _id: req.params.id }).exec();
    res.status(200).json({ status: httpStatus.success, message: "Record deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: httpStatus.failure, message: "Error while deleting record due to" + error });
  }
});

module.exports = router;
