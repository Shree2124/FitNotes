import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  DashboardHomePage,
  GoalsPage,
  HomePage,
  LoginPage,
  ProgressPage,
  RegisterPage,
  WorkoutPage,
  ProfilePage
} from "./pages/index";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useThemeContext } from "./context/ThemeContext";
import { AuthLayout, DashboardLayout } from "./components/index";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./redux/slices/authSlice";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { AppDispatch } from "./redux/store";



function App() {
  const { theme } = useThemeContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
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
              <AuthLayout>
                <DashboardLayout>
                  <Routes>
                    <Route path="" element={<DashboardHomePage />} />
                    <Route path="workouts" element={<WorkoutPage />} />
                    {/* <Route path="nutrition" element={<NutritionPage />} /> */}
                    <Route path="progress" element={<ProgressPage />} />
                    <Route path="goals" element={<GoalsPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                  </Routes>
                </DashboardLayout>
              </AuthLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
