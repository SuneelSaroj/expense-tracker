const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const path = require("path");
const { promisify } = require("util");
const cookieParser = require("cookie-parser");
const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const viewRoute = require("./routes/viewRoute.js");
const addRoute = require("./routes/addRoute.js");
const deleteRoute = require("./routes/deleteRoute.js");
const authRoutes = require("./routes/authRoutes.js");
app.use(viewRoute);
app.use(addRoute);
app.use(deleteRoute);
app.use(authRoutes);

app.use((req, res, next) => {
  console.log("req>>>>>", req.path);
  console.log("reached ");
  next();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

const startServer = async () => {
  const port = process.env.SERVER_PORT || 5000;
  await promisify(app.listen).bind(app)(port);
  console.log(`Listening on port ${port}`);
};
startServer();
