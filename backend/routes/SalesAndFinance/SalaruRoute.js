// routes/finance/salaryRoutes.js
const express = require ("express");
const {
    createSalaryRecord,
    getSalaryRecords,
    getSalaryRecordById,
    updateSalaryRecord,
    deleteSalaryRecord,
    getSalaryRecordsByEmpName,
} = require( "../../controllers/SalesAndFinance/SalaryEmployeeDetails");

const router = express.Router();

// Route for creating a new salary record
router.post("/", createSalaryRecord);

// Route for getting all salary records
router.get("/", getSalaryRecords);

// Route for getting a salary record by id
router.get("/:id", getSalaryRecordById);

// Route for updating a salary record by id
router.put("/:id", updateSalaryRecord);

// Route for deleting a salary record by id
router.delete("/:id", deleteSalaryRecord);

// Route for getting salary records by employee name
router.get("/attendance/:emp_name", getSalaryRecordsByEmpName);

module.exports = router;
