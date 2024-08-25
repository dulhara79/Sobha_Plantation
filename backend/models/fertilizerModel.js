const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fertilizeSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
   
    quantity:{
        type:Number,
        required:true,
    },

    storagelocation:{
        type:String,
        required:true,
    }, 

    addeddate:{
        type:String,
        required:true,
    },

    expiredate:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model(
    "fertilizerModel",
    fertilizeSchema
)
