/**
 * Express module
 * @const
 */
const express = require("express");
/**
 * Import event controller 
 */
const statsController = require("../controllers/stats-controller");
/**
 * Import router from express
 * @router
 */
const router = express.Router();

/**
 * Get number of events
 */
router.get("/count-events", statsController.countEvents);
/**
 * Get number of categories
 */
router.get("/count-categories", statsController.countCategories);
/**
 * Get number of operation
 */
router.get("/count-operations", statsController.countOperations);

module.exports = router;
