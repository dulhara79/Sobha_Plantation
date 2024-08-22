import React from "react";
import { Route, Routes } from "react-router-dom";

// landing page and dashboard
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// finance

// inventory

// employee

// harvest

// crop care

// product
import ProductsDashboard from "./pages/Products/ProductsDashboard.jsx";
import ProductionScheduleOverview from "./pages/Products/ProductionScheduleOverview.jsx";

// field view

// buyers


import PageError from "./pages/PageError.jsx";
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

      {/* product */}
      <Route path="/products/productdashboard" element={<ProductsDashboard />} />
      <Route path="/products/production-overview" element={<ProductionScheduleOverview />} />

      {/* field view  */}

      {/* buyers */}

      {/* page not found & error page */}
    
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
