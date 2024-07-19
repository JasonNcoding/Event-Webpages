/**
 * Express module
 * @const
 */
const express = require("express");

/**
 * Import event controller 
 */
const eventController = require("../controllers/event-controller");
/**
 * Import router from express
 * @router
 */
const router = express.Router();

/**
 * Add event using POST method
 */
router.post("/add-event", eventController.createEvent);
/**
 * Get list of events using GET method
 */
router.get("/events", eventController.getAll);
/**
 * Delete event using DELETE method
 */
router.delete("/delete-event", eventController.removeEvent)
/**
 * Update event using PUT method
 */
router.put("/update-event", eventController.updateEvent)
/**
 * Find event using get method
 */
router.get("/view-event/:eventId", eventController.eventDetail)

module.exports = router;