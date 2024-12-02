import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from "./pages";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";

function App() {
  const { theme } = useThemeContext();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
