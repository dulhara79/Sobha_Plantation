const express = require("express");
const router = express.Router();
const {
    createSchedule,
    getSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
} = require("../controllers/scheduleController");

// Routes for scheduling
router.post("/", createSchedule);
router.get("/", getSchedules);
router.get("/:id", getScheduleById);
router.put("/:id", updateSchedule);
router.delete("/:id", deleteSchedule);

module.exports = router;
