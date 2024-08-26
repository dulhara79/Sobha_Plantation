require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db'); // Import MongoDB connection function


const employeeRoutes = require('./routes/employee');
// const salesRoutes = require('./routes/sales');
const productionRoutes = require('./routes/Products/productionRoute.js');
const fertilizerRoutes = require('./routes/fertilizerRoute');
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

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/employee', employeeRoutes);
// Routes
app.use("/api/salary-employees", salaryEmployeeRoutes);
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/employee", employeeRoutes);
app.use('/api/taskRecords', ETaskRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/harvest', harvestRoutes);
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/yield', yieldRoutes);

/**
* crop
*/
app.use('/api/crop-varieties', cropVarietiesRoutes);
app.use("/api/seedlings", seedlingRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/soil-tests", soilTestingRoutes);
app.use("/api/plant-growth", plantGrowthRoutes);

/**
 * Sales and Finance Routes
 */
app.use("/api/salesAndFinance/finance/transaction", FinancialTransactionRoutes);
app.use("/api/salesAndFinance/finance/invoice", InvoiceRoutes);
app.use("/api/salesAndFinance/sales/analytics", SalesAnalyticsRoutes);
app.use("/api/salesAndFinance/sales/tracking", SalesTrackingRoutes);

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
