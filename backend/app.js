require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db'); // Import MongoDB connection function


const employeeRoutes = require('./routes/employee');
// const salesRoutes = require('./routes/sales');
const productionRoutes = require('./routes/Products/productionRoute.js');
const fertilizerRoutes = require('./routes/fertilizerRoute');
const diseasesRoutes = require('././routes/DiseaseRoutes/diseasesRoute.js');
const yieldRoutes = require('./routes/Harvest/yield');
const harvestRoutes = require('./routes/Harvest/harvest');
const qualityControlRoute = require('./routes/Products/qualityControlRoute.js');

// crop
const cropVarietiesRoutes = require('./routes/cropVarieties');
const seedlingRoutes = require("./routes/seedlingRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const soilTestingRoutes = require("./routes/soilTestingRoutes");
const plantGrowthRoutes = require("./routes/plantGrowthRoutes");

//diseases
const DiseasesDashboard = require('./routes/DiseaseRoutes/DiseasesDashboard');
const CoconutInspections = require('./routes/DiseaseRoutes/CoconutInspections');
const IntercropInspections = require('./routes/DiseaseRoutes/IntercropInspections');
const AddCoconutDiseases = require('./routes/DiseaseRoutes/AddCoconutDiseases');
const AddCropsDiseases = require('./routes/DiseaseRoutes/AddCropsDiseases');
const CoconutTreatments = require('./routes/DiseaseRoutes/CoconutTreatments');
const CoconutPests = require('./routes/DiseaseRoutes/CoconutPests');
const Maintenance = require('./routes/DiseaseRoutes/Maintenance');

//buyer
const BuyerRoutes = require('./routes/buyerRoute');

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
app.use("/api/salary-employees", salaryEmployeeRoutes);
app.use("/api/crop-varieties", cropVarietiesRoutes);
// app.use("/api/employee", employeeRoutes);
app.use('/api/taskRecords', ETaskRoutes);
app.use("/diseases", diseasesRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/harvest',harvestRoutes);
app.use('/api/fertilizer',fertilizerRoutes);


const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
