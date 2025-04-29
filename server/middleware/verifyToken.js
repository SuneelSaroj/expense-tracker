const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const verifyToken = (req, res, next) => {
  const userId = req.headers["x-user-id"]; // Get userId from the headers

  console.log("userId>>>>>>", userId);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No user ID provided in headers",
    });
  }

  try {
    console.log("token>>>>>>", req.cookies);
    const token = req.cookies.auth_token; // Token is still in the cookies for verifying the user

    console.log("token>>>>>>", req.cookies.auth_token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded.userId);
    console.log("userId", userId);

    if (!decoded || decoded.userId != userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token or user mismatch",
      });
    }
    console.log("decoded", decoded);
    console.log("userId", userId);

    req.userId = decoded.userId; // Attach userId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in verifyToken", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = verifyToken;
