const express = require("express");
const router = express.Router();
let RolesSchema = require("../../models/roles/roles");
const fs = require('fs');
const httpStatus = require("../../constants/httpStatus");


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
// if(req.query.fileType == ("text/csv")){
//   const csvContent = [
//     ["Timestamp", "Log Level", "Message"], // CSV header
//     ...logs.logs.map(log => [log.timestamp, log.level, log.message]) // CSV rows
//   ].map(row => row.join("\t")).join("\n"); // Join rows with comma and lines with line break
  
//   const readStream = Readable.from(csvContent, "utf-8");

//   // Set the appropriate headers for the CSV file download
//   res.setHeader("Content-Type", "text/csv");
//   res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
//   readStream.pipe(res); 
// }