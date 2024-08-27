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
import IntercropInspections from "./pages/Diseases/IntercropInspections.jsx";
import AddCoconutDiseases from "./pages/Diseases/AddCoconutDiseases.jsx";
import AddCropsDiseases from "./pages/Diseases/AddCropsDiseases.jsx";
import CoconutTreatments from "./pages/Diseases/CoconutTreatments.jsx";
import CoconutPests from "./pages/Diseases/CoconutPests.jsx";
import Maintenance from "./pages/Diseases/Maintenance.jsx";

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
      <Route path="/intercropInspections" element={<IntercropInspections />} />
      <Route path="/addCoconutDiseases" element={<AddCoconutDiseases />} />
      <Route path="/addCropDiseases" element={<AddCropsDiseases />} />
      <Routh path="/coconutTreatments" element={<CoconutTreatments />} />
      <Route path="/coconutPests" element={<CoconutPests />} />
      <Route path="/maintenance" element={<Maintenance />} />

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
