const express = require("express");
const addController = require("../controller/addController");
const verifyToken = require("../middleware/verifyToken"); // your auth middleware
const router = express.Router();

router.post("/api/add-expense", verifyToken, addController.addExpense);
router.put("/api/update-expense", verifyToken, addController.updateExpense);
router.put("/api/update-category", verifyToken, addController.updateCategory);
router.post("/api/add-category", verifyToken, addController.addCategory);

module.exports = router;
