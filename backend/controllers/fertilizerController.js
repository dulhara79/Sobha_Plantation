const Fertilizer = require("../Model/FertilizerModel");

const getAllFertilizers = async (req, res, next) => {

    let fertilizer;
    //Get all fertilizers
    try{
        fertilizer = await Fertilizer.find();
    }catch (err) {
        console.error(err);
    }

    //not found
    if(!fertilizer){
        return res.status(404).json({message:"Fertilizer not found"});
    }

    //display all fertilizers
    return res.status(200).json({ fertilizer });
};


//data Insert
const addFertilizers = async (req, res, next) => {
    const { name, quantity, storagelocation, addeddate, expiredate } = req.body;

    let fertilizer;

    try {
        fertilizer = new Fertilizer({name,quantity,storagelocation,addeddate,expiredate});
        await fertilizer.save();
    } catch (err) {
        console.log(err);
    }
    //not insert fertilizers
    if (!fertilizer){
        return res.status(404).json({message:"unable to add fertilizers"});

    }
    return res.status(200).json({ fertilizer });
};

//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let fertilizer;

    try {
        fertilizer = await Fertilizer.findById(id);
    }catch (err) {
        console.log(err);
    }

     //not available fertilizers
     if (!fertilizer){
        return res.status(404).json({message:"Fertilizer not found"});

    }
    return res.status(200).json({ fertilizer });
}

//update fertilizer details
const updateFertilizer = async (req, res, next) => {
    const id = req.params.id;
    const { name, quantity, storagelocation, addeddate, expiredate } = req.body;

    let fertilizers;

    try {
        fertilizers = await Fertilizer.findByIdAndUpdate(id, 
            {name: name, quantity: quantity, storagelocation: storagelocation, addeddate: addeddate, expiredate: expiredate });
            fertilizers = await fertilizers.save();
        }catch(err) {
            console.log(err);
        }

        if (!fertilizers){
            return res.status(404).json({message:"Unable to update Fertilizer details"});
    
        }
        return res.status(200).json({ fertilizers });
    
};

//Delete user details
const deleteFertilizer = async ( req, res, next) => {
    const id = req.params.id;

    let fertilizer;

    try{
        fertilizer= await Fertilizer.findByIdAndDelete(id)
    }catch(err) {
        console.log(err);
    }

    if (!fertilizer){
        return res.status(404).json({message:"Unable to delete Fertilizer details"});

    }
    return res.status(200).json({ fertilizer });
};

exports.getAllFertilizers = getAllFertilizers;
exports.addFertilizers = addFertilizers;
exports.getById = getById;
exports.updateFertilizer = updateFertilizer;
exports.deleteFertilizer=deleteFertilizer;