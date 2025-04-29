const express = require("express");
const viewController = require("../controller/viewController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/api/view-expenses", verifyToken, viewController.getExpenses);
router.get("/api/categories", verifyToken, viewController.getCategories);

module.exports = router;
