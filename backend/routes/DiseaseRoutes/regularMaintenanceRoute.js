const express = require("express");
const router = express.Router();
const {
    createRegularMaintenance,
    getAllRegularMaintenanceRecords,
    getRegularMaintenanceById,
    updateRegularMaintenance,
    deleteRegularMaintenance
} = require("../../controllers/DiseaseControllers/regularMaintenanceController");

// Routes for Maintenance Management
router.get("/", getAllRegularMaintenanceRecords);
router.post("/", createRegularMaintenance);
router.get("/:maintenanceId", getRegularMaintenanceById);
router.put("/:maintenanceId", updateRegularMaintenance);
router.delete("/:maintenanceId", deleteRegularMaintenance);

module.exports = router;
