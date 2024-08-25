import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
import DiseasesDashboard from "./pages/Diseases/DiseasesDashboard";
import CoconutInspections from "./pages/Diseases/CoconutInspections";
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
          <Route path="/diseases" element={<DiseasesDashboard />} />
          <Route path="/coconutInspections" element={<CoconutInspections />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);