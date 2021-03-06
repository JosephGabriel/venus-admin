import React, { useState } from "react";

import { ApolloProvider } from "@apollo/client";

import {
  createTheme,
  Theme,
  ThemeProvider,
  CssBaseline,
  PaletteType,
} from "@material-ui/core";

import { Routes, Route } from "react-router-dom";

import { HotelPage } from "./pages/hotel";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { Dashboard } from "./pages/dashboard";
import { Navbar } from "./components/navbar";
import { client } from "./apollo";

function App() {
  const [colorMode, setColorMode] = useState<PaletteType>("dark");

  const theme = createTheme({
    palette: {
      type: colorMode,
      primary: {
        main: "#90caf9",
        dark: "#508AA8",
        // dark: "#031927",
      },
    },
  });

  const handleColor = () => {
    if (colorMode === "light") {
      setColorMode("dark");
    } else {
      setColorMode("light");
    }
  };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider<Theme> theme={theme}>
        <CssBaseline />
        <>
          <Navbar setColorMode={handleColor} />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/hotel/:slug" element={<HotelPage />} />
          </Routes>
        </>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
