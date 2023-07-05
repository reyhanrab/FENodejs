const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connect = require("./config/dbconnection");
let httpStatus = require("./constants/httpStatus");
const rateLimit = require("express-rate-limit");
const authToken = require("./lib/auth");
const UsersSchema = require("./models/users/users");

//MiddleWare
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "You exceeded 100 requests in 12 hour limit!",
  headers: true, //sends headers to show the total number of requests and the duration to
  //wait before trying to make requests again.
});
//  apply to all requests

app.use(limiter);

app.use(
  cors({
    origin: "http://localhost:3001", //(Whatever your frontend url is)
    credentials: true, // <= Accept credentials (cookies) sent by the client
  })
);

app.use(cookieParser()); //To Create Cookies
app.use(
  express.json({
    type: "application/json", //Accept only JSON
  })
); //Parse incoming req body in to json

//Check Auth for each API
app.use(async function (req, res, next) {
  // if (req.method == 'OPTIONS' || req.url == '/auth' || req.url == '/' || req.url == '/api/samlKey' || req.url == '/api/pendoKey' || req.url == '/api/fullStoryKey' || req.url == '/api/trialAccess/start') {
  if (req.url == "/" || req.url == "/login" || req.url == "/signup") {
    next();
  } else {
    if (req.headers.authtoken) {
      let result = authToken.verifyToken(req.headers.authtoken);
      if (result && result.status == true) {
        let userId = result.payload?.userId;
        try {
          const userData = await UsersSchema.findById({ _id: userId }).exec();
          if (userData._id == userId) {
            global.userId = userId;
            next();
          } else {
            res.status(404).json({ status: httpStatus.failure, message: "User doesnot exist." });
          }
        } catch (error) {
          console.log("error while getting user Info", error);
          res.status(500).json({
            status: httpStatus.success,
            message: "Unable to find user information due to technical error",
            error: error.message,
          });
        }
      } else {
        res.clearCookie('authtoken')
        res.redirect('/')
        res.status(401).json({ status: httpStatus.failure, message: result.message ? result.message : "Invalid Token" });
      }
    } else {
      res.status(401).json({ status: httpStatus.failure, message: "Missing auth token in headers" });
    }
  }
});

//Import Routes
// const customer = require("./services/customer/customer");
const signup = require("./services/signup/signup");
const login = require("./services/login/login");
const logout = require("./services/logout/logout");
const projects = require("./services/projects/projects");
const users = require("./services/users/users");
const staticdata = require("./services/staticdata/staticdata");
const roles = require("./services/roles/roles");

//Routes MiddleWare
// app.use("/api/customers", customer);
app.use("/signup", signup);
app.use("/login", login);
app.use("/logout", logout);
app.use("/api/projects", projects);
app.use("/api/users", users);
app.use("/api/staticdata", staticdata);
app.use("/api/roles", roles);

//create connection
connect();

//listen
app.listen(3000);
