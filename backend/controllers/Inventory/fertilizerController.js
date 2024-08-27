const Fertilizers = require("../../models/Inventory/fertilizerModel");

// Controller for creating a new Fertilizer
exports.createFertilizers = async (req, res) => {
    try {
        const { id,addingdate, type, quantity, storagelocation, expiredate,actions } = req.body;

        if (!id || !addingdate || !type || !quantity || !storagelocation || !expiredate || !actions
        ) {
            return res.status(400).send({
                message: 'Please provide all required fields: id,addingdate,type,quantity,storagelocation,expiredate,actions',
            });
        }

        const newFertilizer = {
            id,
            addingdate,
            type,
            quantity,
            storagelocation,
            expiredate,
            actions

        };

        const fertilizers = await Fertilizers.create(newFertilizer);
        return res.status(201).send(fertilizers);
    } catch (error) {
        console.log('Error creating fertilizers:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting all Fertilizers
exports.getAllFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizers.find({});
        return res.status(200).json({
            count: fertilizers.length,
            data: fertilizers,
        });
    } catch (error) {
        console.log('Error fetching fertilizers:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for getting a single Fertilizer by Id
exports.getFertilizersById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Searching for fertilizers with Id:', id);

        const fertilizers = await Fertilizers.findById(id).exec();

        if (!fertilizers) {
            console.log('No fertilizers found with Id:', id);
            return res.status(404).json({ message: 'Fertilizer not found' });
        }

        return res.status(200).json(fertilizers);
    } catch (error) {
        console.log('Error fetching fertilizers:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for updating a Fertilizer by Id
exports.updateFertilizers = async (req, res) => {
    try {
        const { id } = req.params;
        const { addingdate,type,quantity,storagelocation,expiredate,actions
        } = req.body;

        console.log('Updating fertilizer with id:', id);
        console.log('Update data:', req.body);

        if (!addingdate || !type || !quantity || !storagelocation || !expiredate || !actions) {
            return res.status(400).send({
                message: 'Please provide all required fields: addingdate,type,quantity,storagelocation,expiredate,actions',
            });
        }

        const result = await Fertilizers.findOneAndUpdate(
            { id: id },
            { addingdate,type,quantity,storagelocation,expiredate,actions},
            { new: true, runValidators: true } // Return updated document and run schema validations
        ).exec();

        if (!result) {
            return res.status(404).json({ message: 'Fertilizer not found' });
        }

        return res.status(200).send({ message: 'Fertilizer updated successfully', data: updatedFertilizer });
    } catch (error) {
        console.log('Error updating fertilizer:', error.message);
        res.status(500).send({ message: error.message });
    }
};

// Controller for deleting a Fertilizer by Id
exports.deleteFertilizers = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedFertilizers = await Fertilizers.findOneAndDelete({id: id });

        if (!deletedFertilizers) {
            return res.status(404).json({ message: 'Fertilizers not found' });
        }

        return res.status(200).send({ message: 'Fertilizers deleted successfully' });
    } catch (error) {
        console.log('Error deleting fertilizers:', error.message);
        res.status(500).send({ message: error.message });
    }
};
