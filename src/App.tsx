import React from "react";

import {
  createTheme,
  Theme,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider<Theme> theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
