const express = require("express");
const router = express.Router();
let ProjectsSchema = require("../../models/projects/projects");
let UsersSchema = require("../../models/users/users");
let StatusSchema = require("../../models/status/status");
let httpStatus = require("../../constants/httpStatus");

router.get("/", async (req, res) => {
  try {
    const results = await ProjectsSchema.find().exec();
    const users = await UsersSchema.find().exec();
    const statuses = await StatusSchema.find().exec();
    res.status(200).json({ status: 200, results: results });

    // const modifiedResults = results.map((item) => {
      
    //   users.forEach((user) => {
    //     if ("owner" in item && item.owner == user._id) {
    //       const fullName = user.firstname + "  " + user.lastname;
    //       item.owner = fullName;
    //     } else {
    //       return item;
    //     }
    //   });
    //   statuses.forEach((status) => {
    //     if ("status" in item && item.status == status._id) {
    //       item.status = status.name;
    //     } else {
    //       return item;
    //     }
    //   });
    // });
    // if (modifiedResults.length > 0) {
    //   res.status(200).json({ status: 200, results: results });
    // }
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
