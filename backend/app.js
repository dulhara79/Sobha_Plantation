const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const cropVarietiesRoutes = require("./routes/cropVarieties");
const employeeRoutes = require("./routes/employee");
const productionRoutes = require('./routes/productionRoute.js');
const diseasesRoutes = require("./routes/diseases");
const harvestRoutes = require('./routes/harvest');
const fertilizerRoutes = require('./routes/fertilizerRoute.js');

// const salesAndFinanceRoutes = require('./routes/SalesAndFinance/Routes.js');
const FinancialTransactionRoutes = require('./routes/SalesAndFinance/financialTransactionRoutes.js');
const InvoiceRoutes = require('./routes/SalesAndFinance/InvoiceRoutes.js');
const SalesAnalyticsRoutes = require('./routes/SalesAndFinance/SalesAnalyticsRoutes.js');
const SalesTrackingRoutes = require('./routes/SalesAndFinance/SalesTrackingRoutes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/employee", employeeRoutes);
app.use('/api/production', productionRoutes);
app.use("/api/diseases", diseasesRoutes);
app.use('/api/harvest',harvestRoutes);
app.use('/api/fertilizer',fertilizerRoutes);

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
