import React, { useEffect } from "react";
import { fetchUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  CircularProgress,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sampleActivities = [
  { date: "2024-12-25", activity: "Ran 5km in 25 minutes" },
  { date: "2024-12-26", activity: "Cycled 10km in 30 minutes" },
];

const progressData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Calories Burned",
      data: [500, 700, 600, 800],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, loading, error, auth } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!auth) {
      dispatch(fetchUser());
    }
  }, [auth, dispatch]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ backgroundColor: "background.default" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ backgroundColor: "background.default", padding: 2 }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "background.default" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to FitNotes, {user?.username || "User"}!
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activities
              </Typography>
              {sampleActivities.map((activity, index) => (
                <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
                  {activity.date}: {activity.activity}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Workout Goals
              </Typography>
              <Typography variant="body2">
                1. Complete 5km run every morning.
              </Typography>
              <Typography variant="body2">
                2. Cycle 10km every weekend.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progress Summary
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={progressData} options={{ responsive: true, maintainAspectRatio: false }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
