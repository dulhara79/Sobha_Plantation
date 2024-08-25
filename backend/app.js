const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cropVarietiesRoutes = require("./routes/cropVarieties");
const employeeRoutes = require("./routes/employee");
const salesRoutes = require("./routes/sales");
const productionRoutes = require('./routes/productionRoute.js');
const harvestRoutes = require('./routes/harvest');
const seedlingRoutes = require("./routes/seedlingRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const soilTestingRoutes = require("./routes/soilTestingRoutes");
const plantGrowthRoutes = require("./routes/plantGrowthRoutes");


const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/sales", salesRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/harvest',harvestRoutes);
app.use("/api/seedlings", seedlingRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/soil-tests", soilTestingRoutes);
app.use("/api/plant-growth", plantGrowthRoutes);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
