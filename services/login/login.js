const express = require("express");
const router = express.Router();
const authToken = require("../../lib/auth");
const UsersSchema = require("../../models/users/users");

// let cookieOptions = { domain: domainUrl.replace(/(^\w+:|^)\/\//, ''), httpOnly: true, secure: true, sameSite: 'Lax', maxAge: parseInt(process.env.tokenExpiryTime) * 3600000};
let cookieOptions = { httpOnly: true, secure: true, sameSite: 'none' };

router.patch("/", async (req, res) => {
  try {
    const userData = await UsersSchema.findOne({ email: req.body.email }).exec();
    if (userData.password == req.body.password) {
      const newToken = authToken.createToken(userData._id, req.body.email);
      if (newToken.status) {
        try {
          const updateDataObj = {};
          updateDataObj.tokenStatus = true;
          updateDataObj.tokenCreatedAt = Date.now();
          const result = await UsersSchema.findByIdAndUpdate({ _id: userData._id }, updateDataObj, { new: true });
          res.cookie("authtoken", newToken.token);
          res.status(200).json({ results: result, message: "Logged in successfully" });
        } catch (error) {
          console.log("Unable to update token status due to " + error.message);
        }
      } else {
        res.status(400).json({ message: "Invalid authtoken" });
      }
    } else {
      res.status(400).json({ message: "Invalid Password entered" });
    }
  } catch (error) {
    res.status(400).json({ message: "Unable find the user. User doesnot exist with this email" });
  }
});

module.exports = router;
