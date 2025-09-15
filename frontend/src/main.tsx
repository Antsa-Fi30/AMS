// src/main.tsx or src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "./utils/themes/ThemeMUI";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// You can manage dark/light mode with state if needed
const mode: "light" | "dark" = "light";
const theme = createAppTheme(mode);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
