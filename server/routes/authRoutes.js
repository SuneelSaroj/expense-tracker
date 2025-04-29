const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const verifyToken = require("../middleware/verifyToken");
// const userController = require("../controllers/userController");

router.get("/api/check-auth", verifyToken, authController.checkAuth);

router.post("/api/auth/register", authController.register);
router.post("/api/auth/login", authController.login);
// router.post("/api/auth/forgot-password", authController.forgotPassword);

router.post("/api/auth/logout", authController.logout);

module.exports = router;
