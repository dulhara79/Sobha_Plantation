const express = require("express");
const router = express.Router()
const employeeController = require("../controllers/employeeController");

// Routes for crop variety management
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployee);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;