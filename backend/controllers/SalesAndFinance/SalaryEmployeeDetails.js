  // controllers/Finance/salaryController.js
const SalariesRecord = require ( "../../models/SalesAndFinance/SalaryModel");

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
            'basic_days',
            'basic_rate',
            'bonus_salary',
            'ot_hours',
            'ot_rate',
            'epf_etf',
            'description'
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
            ot_hours: request.body.ot_hours,
            ot_rate: request.body.ot_rate,
            epf_etf: request.body.epf_etf,
            description: request.body.description,
        };

        const SalaryRecord = await SalariesRecord.create(NewSalaryRecord);
        return response.status(201).send(SalaryRecord);

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
