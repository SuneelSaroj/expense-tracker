const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const { promisify } = require("util");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const route = require("./routes/getRoute");

app.use((req, res, next) => {
  console.log("req>>>>>", req.path);
  console.log("reached ");
  next();
});

app.use(route);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});


// js name>>>> backlog_report_v2.js for live
const startServer = async () => {
  // const port = process.env.SERVER_PORT || 5002; // for train
  const port = process.env.SERVER_PORT || 50003; // for live(ngnix), 5003 for live backlog_report.js
  await promisify(app.listen).bind(app)(port);
  console.log(`Listening on port ${port}`);
};
startServer();
