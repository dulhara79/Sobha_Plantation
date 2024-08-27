<<<<<<< Updated upstream
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cropVarietiesRoutes = require("./routes/cropVarieties");
const employeeRoutes = require("./routes/employee");
const salesRoutes = require("./routes/sales");
const productionRoutes = require('./routes/productionRoute.js');
const harvestRoutes = require('./routes/harvest');
const fertilizerRoutes = require('./routes/fertilizerRoute.js');
=======
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db'); // Import MongoDB connection function


const employeeRoutes = require('./routes/employee');
// const salesRoutes = require('./routes/sales');
const productionRoutes = require('./routes/Products/productionRoute.js');
//inventory
const fertilizerRoutes = require('./routes/Inventory/fertilizerRoute');
const maintenanceRoutes = require('./routes/Inventory/maintenanceRoute');

const yieldRoutes = require('./routes/Harvest/yield');
const harvestRoutes = require('./routes/Harvest/harvest');

// crop
const cropVarietiesRoutes = require('./routes/cropVarieties');
const seedlingRoutes = require("./routes/seedlingRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const soilTestingRoutes = require("./routes/soilTestingRoutes");
const plantGrowthRoutes = require("./routes/plantGrowthRoutes");

// const salesAndFinanceRoutes = require('./routes/SalesAndFinance/Routes.js');
const FinancialTransactionRoutes = require('./routes/SalesAndFinance/financialTransactionRoutes.js');
const InvoiceRoutes = require('./routes/SalesAndFinance/InvoiceRoutes.js');
const SalesAnalyticsRoutes = require('./routes/SalesAndFinance/SalesAnalyticsRoutes.js');
const SalesTrackingRoutes = require('./routes/SalesAndFinance/SalesTrackingRoutes.js');
const salaryEmployeeRoutes = require("./routes/salaryEmployeeRoutes");

const ETaskRoutes = require('./routes/ETaskRoutes');
const diseasesRoutes = require("./routes/diseases");
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
app.use('/api/harvest',harvestRoutes);
app.use('/api/fertilizer',fertilizerRoutes);
=======
app.use('/api/harvest', harvestRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/maintenance', maintenanceRoutes);

app.use('/api/yield', yieldRoutes);
>>>>>>> Stashed changes


const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
