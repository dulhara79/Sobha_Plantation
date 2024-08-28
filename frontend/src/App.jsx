import React from "react";
import { Route, Routes } from "react-router-dom";

// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// finance

// inventory
import InventoryDashboard from "./pages/Inventory/InventoryDashboard.jsx";
import Fertilizer from"./pages/Inventory/Fertilizer.jsx";
import FertilizerForm from "./pages/Inventory/FertilizerForm.jsx";
import Maintenance from "./pages/Inventory/Maintenance.jsx";
import MaintenanceForm from "./pages/Inventory/MaintenanceForm.jsx";

// employee

// harvest
<<<<<<< Updated upstream
=======
import HarvestDashboard from "./pages/Harvest/HarvestDashboard";
import HarvestSchedule from"./pages/Harvest/HarvestSchedule";

import InventoryDashboard from"./pages/Inventory/InventoryDashboard";
import FertilizerForm from "./pages/Inventory/FertilizerForm.jsx";
import Maintenance from "./pages/Inventory/FertilizerForm.jsx";
import FertilizerForm from "./pages/Inventory/FertilizerForm.jsx";
>>>>>>> Stashed changes

// crop care

// product

// field view
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";


// buyers


// import Test from "./pages/Test.jsx";
import PageError from "./pages/PageError.jsx";
export default function App() {
  return (
    <Routes>
      {/* landing page and dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* finance */}

      {/* inventory */}
<<<<<<< Updated upstream
      <Route path="/Inventory/InventoryDashboard" element={<InventoryDashboard/>}/>
      <Route path="/Inventory/Fertilizer" element={<Fertilizer/>}/>
      <Route path="/Inventory/FertilizerForm" element={<FertilizerForm />} />
      <Route path="/Inventory/Maintenance" element={<Maintenance/>}/>
      <Route path="/Inventory/MaintenanceForm" element={<MaintenanceForm />} />
      
=======
      <Route path="/Inventory/InventoryDashboard" element={<InventoryDashboard />} />
      <Route path="/Inventory/Fertilizer" element={<Fertilizer />} />
      <Route path="/Inventory/FertilizerForm" element={<FertilizerForm />} />
      <Route path="/Inventory/Maintenance" element={<Maintenance />} />
      <Route path="/Inventory/MaintenanceForm" element={<MaintenanceForm />} />
      

>>>>>>> Stashed changes
      {/* employee */}

      {/* harvest */}

      {/* crop care */}

      {/* product */}

      {/* field view  */}
      <Route path="cultivationDashboard" element={<CultivationDashboard />} />

      {/* buyers */}

      {/* page not found & error page */}
      {/* <Route path="/test" element={<Test />} /> */}

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
