import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardHomePage, GoalsPage, HomePage, LoginPage, ProgressPage, RegisterPage, WorkoutPage } from "./pages/index.js";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import { DashboardLayout } from "./components/index.js";


function App() {
  const { theme } = useThemeContext();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
          path="/dashboard/*"
          element={
            // <AuthLayout>
              <DashboardLayout>
                <Routes>
                  <Route path="" element={<DashboardHomePage />} />
                  <Route path="workouts" element={<WorkoutPage />} />
                  {/* <Route path="nutrition" element={<NutritionPage />} /> */}
                  <Route path="progress" element={<ProgressPage />} />
                  <Route path="goals" element={<GoalsPage />} />
                </Routes>
              </DashboardLayout>
            // </AuthLayout>
          }
        />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
