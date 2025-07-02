const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require('../middleware/adminMiddleware')

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", authMiddleware.authMiddleware, adminMiddleware.adminOnly, eventController.createEvent);
router.put("/:id", authMiddleware.authMiddleware, adminMiddleware.adminOnly, eventController.updateEvent);
router.delete("/:id", authMiddleware.authMiddleware, adminMiddleware.adminOnly, eventController.deleteEvent);

module.exports = router;
