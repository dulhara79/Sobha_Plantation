//pass:  5nnsrO2tPt9w60ou
//http://localhost:5000/api/crop-varieties

const express = require("express");
const connectDB = require("./config/db");
const cropVarietiesRoutes = require("./routes/cropVarieties");
const employeeRoutes = require("./routes/employee");
const productionRoutes = require('./routes/productionRoute.js');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/employee", employeeRoutes);
app.use('/api/production', productionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
