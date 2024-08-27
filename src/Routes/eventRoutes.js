const express = require("express");
const { createEvent, getEvent } = require("../controllers/EventController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware,  createEvent);
router.get("/all", authMiddleware,  getEvent);

module.exports = router;