import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

import "./global.css";

const muiTheme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StyledEngineProvider>
  </BrowserRouter>
);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//      <StyledEngineProvider injectFirst>
//        <ThemeProvider theme={muiTheme}>
//          <CssBaseline />
//          <App />
//        </ThemeProvider>
//      </StyledEngineProvider>
//    </BrowserRouter>
// )