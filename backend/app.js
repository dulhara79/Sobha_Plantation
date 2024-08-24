require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const connectDB = require('./config/db'); // Import MongoDB connection function
const cropVarietiesRoutes = require('./routes/cropVarieties');
const employeeRoutes = require('./routes/employee');
const salesRoutes = require('./routes/sales');
const productionRoutes = require('./routes/productionRoute');
const harvestRoutes = require('./routes/harvest');
const fertilizerRoutes = require('./routes/fertilizerRoute');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/crop-varieties', cropVarietiesRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/production', productionRoutes);
app.use('/api/harvest', harvestRoutes);
app.use('/api/fertilizer', fertilizerRoutes);

// Set the port, default to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
