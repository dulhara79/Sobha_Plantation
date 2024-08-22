//pass:  5nnsrO2tPt9w60ou
//http://localhost:5000/api/crop-varieties
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cropVarietiesRoutes = require("./routes/cropVarieties");
const buyerRoutes = require("./routes/buyer");

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/buyer", buyerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
