const express = require("express");
const router = express.Router();
const {
    createMaintenance,
    getAllMaintenanceRecords,
    getMaintenanceById,
    updateMaintenance,
    deleteMaintenance
} = require("../../controllers/DiseaseControllers/maintenanceController");

// Routes for Maintenance Management
router.get("/", getAllMaintenanceRecords);
router.post("/", createMaintenance);
router.get("/:maintenanceId", getMaintenanceById);
router.put("/:maintenanceId", updateMaintenance);
router.delete("/:maintenanceId", deleteMaintenance);

module.exports = router;
