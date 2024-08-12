const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:5nnsrO2tPt9w60ou@atlascluster.aias7.mongodb.net/", {
          
        });
        console.log("MongoDB connected successfully.");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
