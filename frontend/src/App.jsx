import React from "react";
import { Link } from "react-router-dom";


// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// finance

// inventory

// employee

// harvest

// crop care (diseases)
import DiseasesDashboard from "./pages/Diseases/DiseasesDashboard.jsx";
import CoconutInspections from "./pages/Diseases/CoconutInspections.jsx";

// product

// field view
import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard.jsx";
import VarietyCrop from "./pages/CropVarieties/varietyCrop.jsx";

// buyers


export default function App() {
  return (
    <Routes>
      {/* landing page and dashboard */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* finance */}

      {/* inventory */}

      {/* employee */}

      {/* harvest */}

      {/* crop care */}
      <Route path="/diseases" element={<DiseasesDashboard />} />
      <Route path="/coconutInspections" element={<CoconutInspections />} />

      {/* product */}

      {/* field view  */}
      <Route path="cultivationDashboard" element={<CultivationDashboard />} />
      <Route path="varietyCrop" element={<VarietyCrop />} />
      {/* buyers */}

      {/* page not found & error page */}
      {/* <Route path="/test" element={<Test />} /> */}

      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
