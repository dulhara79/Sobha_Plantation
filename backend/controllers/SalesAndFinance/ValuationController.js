const ValuationsRecord = require('../../models/SalesAndFinance/ValuationModel');

exports.createValuationRecord = async (request, response) => {
    try {
        const {
            date,
            type,
            subtype,
            quantity,
            price,
            description,
            payer_payee,
            appreciationOrDepreciation
        } = request.body;

        // Check for all required fields
        if (!date || !type || !subtype  || !price || !description || !payer_payee ) {
            return response.status(400).send({
                message: 'Send all required fields',
                fields: {
                    date,
                    type,
                    subtype,
                    quantity,
                    price,
                    description,
                    payer_payee,
                    appreciationOrDepreciation
                }
            });
        }

        const NewValuationsRecord = {
            date,
            type,
            subtype,
            quantity,
            price,
            description,
            payer_payee,
            appreciationOrDepreciation,
        };

        const ValuationRecord = await ValuationsRecord.create(NewValuationsRecord);
        return response.status(201).json({status:true, ValuationRecord});
        // return response.status(201).send(ValuationRecord);

    } catch (error) {
        console.error('Server Error:', error.message);
        response.status(500).send({ message: error.message });
    }
};

// Route for Get All from database

exports.getAllValuationRecords = async (request, response) => {
    try {
        const ValuationRecord = await ValuationsRecord.find({});

        return response.status(200).json({
            count: ValuationRecord.length,
            data: ValuationRecord,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Route for Get One transaction from database by id
exports.getValuationRecordById = async (request, response) => {
    try {
        const { id } = request.params;

        const ValuationRecord = await ValuationsRecord.findById(id);

        return response.status(200).json(ValuationRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Route for Update a transaction
exports.updateValuationRecord = async (request, response) => {
    try {
        if (
            !request.body.date ||
            !request.body.type ||
            !request.body.subtype ||
            !request.body.quantity ||
            !request.body.price ||
            !request.body.description ||
            !request.body.payer_payee ||
            !request.body.appreciationOrDepreciation
        ) {
            return response.status(400).send({
                message: 'Send all required fields',
            });
        }

        const { id } = request.params;

        const result = await ValuationsRecord.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Transaction record not found' });
        }

        return response.status(200).send({ message: 'Transaction record updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

// Route for Delete a book
exports.deleteValuationRecord = async (request, response) => {
    try {
        const { id } = request.params;

        const result = await ValuationsRecord.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Transaction record not found' });
        }

        return response.status(200).send({ message: 'Transaction record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
};

exports.getBalanceSheet = async (req, res) => {
    try {
      const assets = await ValuationsRecord.find({ type: 'asset' });
      const liabilities = await ValuationsRecord.find({ type: 'liability' });
  
      // Calculate total values
      const totalAssets = assets.reduce((sum, asset) => sum + (asset.price || 0), 0);
      const totalLiabilities = liabilities.reduce((sum, liability) => sum + (liability.price || 0), 0);
  
      // Compute equity
      const equity = totalAssets - totalLiabilities;
  
      res.json({ assets, liabilities, equity });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching valuation data', error });
    }
  };