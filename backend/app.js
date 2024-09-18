require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db'); // Import MongoDB connection function
const http = require('http');
const { Server } = require('socket.io');

// const salesRoutes = require('./routes/sales');

//inventory
const fertilizerRoutes = require('./routes/Inventory/fertilizers.js'); 
const maintenanceRoutes = require('./routes/Inventory/maintenance.js'); 
const equipmentRoutes = require('./routes/Inventory/equipments.js'); 
const requestRoutes = require('./routes/Inventory/requests.js'); 
 

/**
 * production
 */
const productionRoutes = require('./routes/Products/productionRoute.js');
const qualityControlRoute = require('./routes/Products/qualityControlRoute.js');
const labelingPricesRoute = require('./routes/Products/labelingPricesRoute.js');
const labelingRoute = require('./routes/Products/labelingRoute.js');


/**
 * harvest
 */
const yieldRoutes = require('./routes/Harvest/yield.js');
const harvestRoutes = require('./routes/Harvest/harvest.js');
const complianceCheckRoutes = require('./routes/Harvest/compliance.js')


/**
 * crop care
 */
const diseasesRoute = require('./routes/DiseaseRoutes/diseasesRoute.js');
const cropDiseasesRoute = require('./routes/DiseaseRoutes/cropDiseasesRoute.js')


/**
 * crop
 */
const cropVarietiesRoutes = require('./routes/cropVarieties');
const seedlingRoutes = require("./routes/seedlingRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const soilTestingRoutes = require("./routes/soilTestingRoutes");
const plantGrowthRoutes = require("./routes/plantGrowthRoutes");

/**
 * buyer
 */
const BuyerRoutes = require('./routes/buyerRoute');

/**
 * Sales and Finance Routes
 */
const FinancialTransactionRoutes = require('./routes/SalesAndFinance/FinancialTransactionRoutes.js');
const InvoiceRoutes = require('./routes/SalesAndFinance/InvoiceRoutes.js');
const SalesAnalyticsRoutes = require('./routes/SalesAndFinance/SalesAnalyticsRoutes.js');
const SalesTrackingRoutes = require('./routes/SalesAndFinance/SalesTrackingRoutes.js');
const valuationRoutes = require('./routes/SalesAndFinance/valuationRoutes.js');
//const financialAnalyticsRoutes = require('./routes/SalesAndFinance/financialAnalyticsRoutes.js');

//employee
const attendanceRoute = require('./routes/Employee/AttendanceRoute.js');
const salaryEmployeeRoutes = require("./routes/Employee/salaryEmployeeRoutes.js");
const ETaskRoutes = require('./routes/Employee/ETaskRoutes.js');
const employeeRoutes = require('./routes/Employee/employee.js');

const app = express();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server);

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Define routes
//employee
app.use('/api/employee', employeeRoutes);
app.use("/api/salary-employees", salaryEmployeeRoutes);
app.use('/api/attendance', attendanceRoute);
app.use('/api/taskRecords', ETaskRoutes);

// harvest
app.use('/api/harvest', harvestRoutes);
app.use('/api/yield', yieldRoutes);
app.use('/api/compliance-checks', complianceCheckRoutes);// Ensure the route path is correct

//products
app.use('/api/production', productionRoutes);
app.use('/api/quality-control', qualityControlRoute);
app.use('/api/labeling-prices', labelingPricesRoute);
app.use('/api/labeling', labelingRoute);

//inventory
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/equipments', equipmentRoutes);
app.use('/api/requests', requestRoutes);

/**
* crop
*/
app.use('/api/crop-varieties', cropVarietiesRoutes);
app.use("/api/seedlings", seedlingRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/soil-tests", soilTestingRoutes);
app.use("/api/plant-growth", plantGrowthRoutes);

/**
 * crop care
 */
app.use('/api/diseases', diseasesRoute);
app.use('/api/cropDiseases', cropDiseasesRoute);



/**
 * Sales and Finance Routes
 */
app.use("/api/salesAndFinance/finance/transaction", FinancialTransactionRoutes);
app.use("/api/salesAndFinance/finance/invoice", InvoiceRoutes);
app.use("/api/salesAndFinance/sales/analytics", SalesAnalyticsRoutes);
app.use("/api/salesAndFinance/sales/tracking", SalesTrackingRoutes);
app.use("/api/salesAndFinance/finance/valuation", valuationRoutes);
//app.use("/api/salesAndFinance/finance/analytics", financialAnalyticsRoutes);

/**
 * buyer
 */
//app.use('/api/buyer', BuyerRoutes);

//app.use('/api/sales', salesRoutes);




// Socket.IO setup
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle events from the client
    socket.on('someEvent', (data) => {
      console.log('Received data:', data);
      // You can emit events back to clients here
      socket.emit('responseEvent', { message: 'Data received' });
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = process.env.PORT || 8090;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
