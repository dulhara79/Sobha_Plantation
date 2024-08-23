import React from "react";
import { Route, Routes } from "react-router-dom";

// landing page and dashboard
// import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// finance
import FinanceDashboard from "./pages/Finance/FinanceDashboard.jsx";

// inventory

// employee

// harvest

// crop care

// product

// field view

// buyers

import Test from "./pages/Test.jsx";
import PageError from "./pages/PageError.jsx";
export default function App() {
  return (
    <Routes>
      {/* landing page and dashboard */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* finance */}
      <Route path="/finance/dashboard" element={<FinanceDashboard />} />
      {/* inventory */}

      {/* employee */}

      {/* harvest */}

      {/* crop care */}

      {/* product */}

      {/* field view  */}

      {/* buyers */}

      {/* page not found & error page */}
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<PageError />} />
    </Routes>
  );
}
