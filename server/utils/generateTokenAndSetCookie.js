const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: "../.env" });

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: "lax", // Use "lax" or "none" for local development
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  });
};

module.exports = generateTokenAndSetCookie;
