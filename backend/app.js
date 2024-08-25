const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const cropVarietiesRoutes = require("./routes/cropVarieties");
const employeeRoutes = require('./routes/employee');
const salaryEmployeeRoutes = require("./routes/salaryEmployeeRoutes");
const salesRoutes = require("./routes/sales");
const productionRoutes = require('./routes/productionRoute.js');
const diseasesRoutes = require("./routes/diseases");
const harvestRoutes = require('./routes/harvest');
const fertilizerRoutes = require('./routes/fertilizerRoute.js');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();
// Routes
app.use("/api/salary-employees", salaryEmployeeRoutes);
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/sales", salesRoutes);
app.use('/api/production', productionRoutes);
app.use("/api/diseases", diseasesRoutes);
app.use('/api/harvest',harvestRoutes);
app.use('/api/fertilizer',fertilizerRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });