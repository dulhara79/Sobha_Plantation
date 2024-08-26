const Fertilizer = require('../models/fertilizerModel');

// Controller for getting all fertilizers
exports.getAllFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find({});
        if (!fertilizers || fertilizers.length === 0) {
            return res.status(404).json({ message: 'No fertilizers found' });
        }
        return res.status(200).json({
            count: fertilizers.length,
            data: fertilizers,
        });
    } catch (error) {
        console.error('Error fetching fertilizers:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for adding a new fertilizer
exports.addFertilizers = async (req, res) => {
    const { name, quantity, storageLocation, addedDate, expireDate } = req.body;

    if (!name || !quantity || !storageLocation || !addedDate || !expireDate) {
        return res.status(400).send({
            message: 'Please provide all required fields: name, quantity, storageLocation, addedDate, expireDate',
        });
    }

    try {
        const newFertilizer = new Fertilizer({
            name,
            quantity,
            storageLocation,
            addedDate,
            expireDate
        });
        const savedFertilizer = await newFertilizer.save();
        return res.status(201).json(savedFertilizer);
    } catch (error) {
        console.error('Error adding fertilizer:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single fertilizer by ID
exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const fertilizer = await Fertilizer.findById(id);
        if (!fertilizer) {
            return res.status(404).json({ message: 'Fertilizer not found' });
        }
        return res.status(200).json(fertilizer);
    } catch (error) {
        console.error('Error fetching fertilizer:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a fertilizer by ID
exports.updateFertilizer = async (req, res) => {
    const { id } = req.params;
    const { name, quantity, storageLocation, addedDate, expireDate } = req.body;

    if (!name || !quantity || !storageLocation || !addedDate || !expireDate) {
        return res.status(400).send({
            message: 'Please provide all required fields: name, quantity, storageLocation, addedDate, expireDate',
        });
    }

    try {
        const updatedFertilizer = await Fertilizer.findByIdAndUpdate(id, {
            name,
            quantity,
            storageLocation,
            addedDate,
            expireDate
        }, { new: true });

        if (!updatedFertilizer) {
            return res.status(404).json({ message: 'Fertilizer not found' });
        }
        return res.status(200).json({ message: 'Fertilizer updated successfully', data: updatedFertilizer });
    } catch (error) {
        console.error('Error updating fertilizer:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a fertilizer by ID
exports.deleteFertilizer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedFertilizer = await Fertilizer.findByIdAndDelete(id);
        if (!deletedFertilizer) {
            return res.status(404).json({ message: 'Fertilizer not found' });
        }
        return res.status(200).json({ message: 'Fertilizer deleted successfully', data: deletedFertilizer });
    } catch (error) {
        console.error('Error deleting fertilizer:', error.message);
        res.status(500).send({ message: error.message });
    }
};
