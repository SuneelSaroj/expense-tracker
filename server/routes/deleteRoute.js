const express = require("express");
const deleteController = require("../controller/deleteController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.delete(
  "/api/delete-expense/:id",
  verifyToken,
  deleteController.deleteExpense
);
router.delete(
  "/api/delete-category/:id",
  verifyToken,
  deleteController.deleteCategory
);

module.exports = router;
