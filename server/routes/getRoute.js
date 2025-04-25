const express = require("express");
const maxController = require("../controller/getController");
const router = express.Router();

router.get("/data", maxController.getData);
router.get("/export", maxController.exportData);
router.get("/datesearch", maxController.searchData);
router.get("/getlimit", maxController.getLimit);
router.post("/setlimit", maxController.setLimit);

module.exports = router;
