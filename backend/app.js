const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const cropVarietiesRoutes = require("./routes/cropVarieties");
const employeeRoutes = require("./routes/employee");
const salesRoutes = require("./routes/sales");
const productionRoutes = require('./routes/productionRoute.js');
const diseasesRoutes = require('././routes/DiseaseRoutes/diseasesRoute.js');
const harvestRoutes = require('./routes/harvest');
const fertilizerRoutes = require('./routes/fertilizerRoute.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectDB();

// Routes
app.use("/api/crop-varieties", cropVarietiesRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/sales", salesRoutes);
app.use('/api/production', productionRoutes);
app.use("/diseases", diseasesRoutes);
app.use('/api/harvest',harvestRoutes);
app.use('/api/fertilizer',fertilizerRoutes);

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
