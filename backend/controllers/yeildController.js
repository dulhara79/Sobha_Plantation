const YieldRecords = require('../models/Yield');

// Controller for creating a new Yield Records
exports.createYieldRecords = async (req, res) => {
    try {
        const { id,harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation } = req.body;

        if (!id || !harvestdate || !cropType || !ageofYieldDate || !quantity || !wayPicked || !treesPicked || !storageLocation) {
            return res.status(400).send({
                message: 'Please provide all required fields: id, harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation',
            });
        }

        const newRecord = {
            id,
            harvestdate,
            cropType,
            ageofYieldDate,
            quantity,
            wayPicked,
            treesPicked,
            storageLocation
        };

        const yieldRecords = await YieldRecords.create(newRecord);
        return res.status(201).send(yieldRecords);
    } catch (error) {
        console.log('Error creating yield Records:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all yield Records
exports.getAllYieldRecords = async (req, res) => {
    try {
        const records = await YieldRecords.find({});
        return res.status(200).json({
            count: records.length,
            data: records,
        });
    } catch (error) {
        console.log('Error fetching records:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single Yield Records by Id
exports.getYieldRecordsById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Searching for records with Id:', id);
        
        const records = await YieldRecords.findOne({ id: id }).exec();

        if (!records) {
            console.log('No records found with Id:', id);
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json(records);
    } catch (error) {
        console.log('Error fetching records:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a Yield Records by Id
exports.updateYieldRecords = async (req, res) => {
    try {
        // Extract Id from URL parameters and data from request body
        const { id } = req.params;
        const { harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation } = req.body;
        // Log the incoming parameters and data
        console.log('Updating schedule with harvestId:', id);
        console.log('Update data:', req.body);

        // Check if required fields are present
        if (!harvestdate || !cropType || !ageofYieldDate || !quantity || !wayPicked || !treesPicked || !storageLocation ) {
            return res.status(400).send({
                message: 'Send all required fields: harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation', });
        }

        // Perform the update operation
        const result = await YieldRecords.findOneAndUpdate(
            { id: id },
            { harvestdate, cropType, ageofYieldDate, quantity, wayPicked, treesPicked, storageLocation },
            { new: true }
        ).exec();

        // Check if the schedule was found and updated
        if (!records) {
            return res.status(404).json({ message: 'Yield Records not found' });
        }

        // Send the updated schedule
        return res.status(200).send({ message: 'Yield Records updated successfully', data: result });
    } catch (error) {
        // Log any errors and send a response
        console.log('Error updating Records:', error.message);
        res.status(500).send({ message: error.message });
    }
};


// Controller for deleting a Yield Records by Id
exports.deleteYieldRecords = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRecords = await YieldRecords.findOneAndDelete({id: id });

        if (!deletedRecords) {
            return res.status(404).json({ message: 'Records not found' });
        }

        return res.status(200).send({ message: 'Records deleted successfully' });
    } catch (error) {
        console.log('Error deleting Records:', error.message);
        res.status(500).send({ message: error.message });
    }
};
