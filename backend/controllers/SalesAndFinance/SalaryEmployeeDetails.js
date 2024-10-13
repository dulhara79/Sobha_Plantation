  // controllers/Finance/salaryController.js
const SalariesRecord = require ( "../../models/SalesAndFinance/SalaryModel");
const moment = require("moment");

// Controller for creating a new salary record
exports.createSalaryRecord = async (request, response) => {
    try {
        const requiredFields = [
            'payment_date',
            'emp_name',
            'salary_start_date',
            'salary_end_date',
            'nic',
            'type',
            // 'basic_days',
            'basic_rate',
            // 'bonus_salary',
            // 'after_hours',
            // 'saturday_hours',
            // 'sunday_hours',
            'ot_rate',
            'epf_etf',
            // 'description',
            // "isPaid",
            "partialPayment"
        ];

        const missingFields = requiredFields.filter(field => !request.body[field]);

        if (missingFields.length > 0) {
            return response.status(400).send({
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
        }

        const NewSalaryRecord = {
            payment_date: request.body.payment_date,
            emp_name: request.body.emp_name,
            salary_start_date: request.body.salary_start_date,
            salary_end_date: request.body.salary_end_date,
            nic: request.body.nic,
            type: request.body.type,
            basic_days: request.body.basic_days,
            basic_rate: request.body.basic_rate,
            bonus_salary: request.body.bonus_salary,
            week_hours: request.body.after_hours,
            saturday_hours: request.body.saturday_hours,
            sunday_hours: request.body.sunday_hours,
            ot_rate: request.body.ot_rate,
            epf_etf: request.body.epf_etf,
            description: request.body.description,
            isPaid: request.body.isPaid,
            partialPayment: request.body.partialPayment,
            netSalary: request.body.netSalary,
        };

        console.log(NewSalaryRecord);

        const SalaryRecord = await SalariesRecord.create(NewSalaryRecord);
        return response.status(201).send({SalaryRecord, id: SalaryRecord._id});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Controller for getting all salary records
exports.getSalaryRecords = async (request, response) => {
    try {
        const SalaryRecord = await SalariesRecord.find({});

        return response.status(200).json({
            count: SalaryRecord.length,
            data: SalaryRecord,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Controller for getting a salary record by id
exports.getSalaryRecordById = async (request, response) => {
    try {
        const { id } = request.params;

        const SalaryRecord = await SalariesRecord.findById(id);

        if (!SalaryRecord) {
            return response.status(404).json({ message: "Salary record not found" });
        }

        return response.status(200).json(SalaryRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Controller for updating a salary record by id
exports.updateSalaryRecord = async (request, response) => {
    try {
        const { id } = request.params;

        const updatedRecord = await SalariesRecord.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedRecord) {
            return response.status(404).json({ message: 'Salary record not found' });
        }

        return response.status(200).send({ message: 'Salary record updated successfully', data: updatedRecord });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Controller for deleting a salary record by id
exports.deleteSalaryRecord = async (request, response) => {
    try {
        const { id } = request.params;

        const result = await SalariesRecord.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Salary record not found' });
        }

        return response.status(200).send({ message: 'Salary record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// exports.getSalaryRecordsByEmpName = async (req, res) => {
//     try {
//       const { emp_name } = req.params;
//       console.log("emp name: ", emp_name);
//       const { startDate, endDate } = req.query;
  
//       if (!emp_name || !startDate || !endDate) {
//         console.error("Missing required parameters:", { emp_name, startDate, endDate });
//         return res.status(400).json({ error: "Missing required parameters" });
//       }
  
//       const startOfMonth = moment(startDate).startOf("day").toDate();
//       const endOfMonth = moment(endDate).endOf("day").toDate();
  
//       const recordExists = await SalariesRecord.findOne({
//         emp_name: emp_name,
//         payment_date: { $gte: startOfMonth, $lte: endOfMonth },
//       });
  
//       if (recordExists) {
//         return res.status(200).json({ success:false, message: "Salary already paid for this period." });
//       } else {
//         return res.status(200).json({ message: "Salary not paid yet." });
//       }
//     } catch (error) {
//       console.error("Error fetching salary record:", error.stack || error.message || error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };

exports.getSalaryRecordsByEmpName = async (req, res) => {
    try {
        const { emp_name } = req.params;
        const { startDate, endDate } = req.query;

        if (!emp_name || !startDate || !endDate) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        // const startOfMonth = moment(startDate).startOf("month").toDate();
        // const endOfMonth = moment(endDate).endOf("month").toDate();

        const startOfMonth = moment(startDate).startOf("month").format("YYYY-MM-DD");
const endOfMonth = moment(endDate).endOf("month").format("YYYY-MM-DD");


        console.log("startOfMonth: ", startOfMonth);
        console.log("endOfMonth: ", endOfMonth);

        const recordExists = await SalariesRecord.findOne({
            emp_name,
            payment_date: { $gte: startOfMonth, $lte: endOfMonth },
        });

        console.log("recordExists: ", recordExists);

        if (recordExists) {
            return res.status(200).json({ 
                success: false, 
                message: "Salary already paid for this period.",
                data: recordExists,
                isPaid: recordExists.isPaid,
            });
        } else {
            return res.status(200).json({ 
                success: true, 
                message: "Salary not paid yet.",
                isPaid: false,
            });
        }
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

