const express = require("express");
const router = express.Router();
let customerSchema = require("../../models/customer");

router.get("/", async (req, res) => {
  try {
    const response = await customerSchema.find({}).exec();
    res.send({
      status: 200,
      result: response,
    });
  } catch (error) {
    res.status(400).json({ message: "Error while retrieving records due to" + error });
  }
});

module.exports = router;
