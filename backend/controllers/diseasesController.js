const diseases = require("../models/diseases");

// Create a new diseases record
exports.createDiseases = async (req, res) => {
    try {
        const newDiseases = new diseases(req.body); 
        await newDiseases.save();
        res.status(201).json(newDiseases);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Get all diseases records
exports.getAllDiseases = async (req, res) => {
    try {
        const diseasesRecords = await diseases.find();  
        res.status(200).json(diseasesRecords);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a specific disease by ID
exports.getDiseasesById = async (req, res) => {
    try {
        const diseasesRecord = await diseases.findById(req.params.id);
        if (!diseasesRecord) {
            return res.status(404).json({ message: "Diseases not found" });
        }
        res.status(200).json(diseasesRecord);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Update a diseases record
exports.updateDiseases = async (req, res) => {
    try {
        const updatedDiseases = await diseases.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDiseases) {
            return res.status(404).json({ message: "Diseases not found" });
        }
        res.status(200).json(updatedDiseases);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a diseases record
exports.deleteDiseases = async (req, res) => {
    try {
        const deletedDiseases = await diseases.findByIdAndDelete(req.params.id);
        if (!deletedDiseases) {
            return res.status(404).json({ message: "Diseases not found" });
        }
        res.status(200).json({ message: "Diseases deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
};
