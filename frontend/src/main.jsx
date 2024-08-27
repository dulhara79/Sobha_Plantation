import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import DiseasesDashboard from "./pages/Diseases/DiseasesDashboard";
import CoconutInspections from "./pages/Diseases/CoconutInspections";
import IntercropInspections from "./pages/Diseases/IntercropInspections";
import AddCoconutDiseases from "./pages/Diseases/AddCoconutDiseases";
import AddCropsDiseases from "./pages/Diseases/AddCropsDiseases";
import CoconutTreatments from "./pages/Diseases/CoconutTreatments";
import CoconutPests from "./pages/Diseases/CoconutPests";
import Maintenance from "./pages/Diseases/Maintenance";

import CultivationDashboard from "./pages/CropVarieties/CultivationDashboard";
import VarietyCrop from "./pages/CropVarieties/varietyCrop";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

import "./index.css";
import PageError from "./pages/PageError";

const muiTheme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/diseases" element={<DiseasesDashboard />} />
          <Route path="/coconutInspections" element={<CoconutInspections />} />
          <Route path="/intercropInspections" element={<IntercropInspections />} />
          <Route path="/addCoconutDiseases" element={<AddCoconutDiseases />} />
          <Route path="/addCropsDiseases" element={<AddCropsDiseases />} />
          <Route path="/coconutTreatments" element={<CoconutTreatments />} />
          <Route path="/coconutPests" element={<CoconutPests />} />
          <Route path="/maintenance" element={<Maintenance />} />

          <Route path="/cultivationDashboard" element={<CultivationDashboard />} />
          <Route path="/varietyCrop" element={<VarietyCrop />} />

          <Route path="*" element={<PageError />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);