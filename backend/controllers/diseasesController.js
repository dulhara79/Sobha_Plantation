const { get } = require("mongoose");
const diseases = require("../models/diseases");

// Get all disease records
const getAllDiseases = async (req, res, next) => {

    let diseaseRecords;

    try {
        diseaseRecords = await diseases.find();
    } catch (error) {  
        console.log(error);
    }

    if(!diseaseRecords) {
        return res.status(404).json({ message: "No diseases found" });
    }

    //display all diseases
    return res.status(200).json({ diseaseRecords });
};

// Create a new disease record
const createDiseases = async (req, res, next) => {
    const { recordId, pest, disease, inspectionDate, section, inspector, nextDate } = req.body;

    let newDiseaseRecord;

    try {
        newDiseaseRecord = new diseases({recordId, pest, disease, inspectionDate, section, inspector, nextDate});
        await newDiseaseRecord.save();
    }catch (error) {
        console.log(error);
    }   

    if(!newDiseaseRecord) {
        return res.status(400).json({ message: "Failed to create a new disease record" });
    }

    return res.status(200).json({ newDiseaseRecord });

};

// Get a specific disease by ID

const getDiseasesById = async (req, res, next) => {

    const diseaseId = req.params.id;

    let diseaseRecord;

    try {
        diseaseRecord = await diseases.findById(diseaseId);
    }catch (error) {
        console.log(error);
    }

    if(!diseaseRecord) {
        return res.status(404).json({ message: "Disease not found" });
    }
    return res.status(200).json({ diseaseRecord });

}


// Update a diseases record

const updateDiseases = async (req, res, next) => {

    const diseaseId = req.params.id;
    const { recordId, pest, disease, inspectionDate, section, inspector, nextDate } = req.body;

    let updatedDiseaseRecord;

    try {
        updatedDiseaseRecord = await diseases.findByIdAndUpdate(diseaseId, {recordId, pest, disease, inspectionDate, section, inspector, nextDate});
        updatedDiseaseRecord = await updatedDiseaseRecord.save();
    }catch (error) {
        console.log(error);
    }

    if(!updatedDiseaseRecord) {
        return res.status(404).json({ message: "Disease not found" });
    }

    return res.status(200).json({ updatedDiseaseRecord });

}


// Delete a diseases record

const deleteDiseases = async (req, res, next) => {

    const diseaseId = req.params.id;

    let deletedDiseaseRecord;

    try {
        deletedDiseaseRecord = await diseases.findByIdAndDelete(diseaseId);
    }catch (error) {
        console.log(error);
    }

    if(!deletedDiseaseRecord) {
        return res.status(404).json({ message: "Disease not found" });
    }

    return res.status(200).json({ message: "Disease record deleted successfully" });
};


exports.getAllDiseases = getAllDiseases;
exports.createDiseases = createDiseases;
exports.getDiseasesById = getDiseasesById;
exports.updateDiseases = updateDiseases;
exports.deleteDiseases = deleteDiseases;