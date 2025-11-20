// src/main.tsx or src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createAppTheme } from "./utils/themes/ThemeMUI";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { SnackbarProvider } from "./contexts/SnackbarContext";
const root = ReactDOM.createRoot(document.getElementById("root")!);

const themeMode = localStorage.getItem("theme");
const mode: "light" | "dark" =
  themeMode === "light" ? "light" : themeMode === "dark" ? "dark" : "dark";
const theme = createAppTheme(mode);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
