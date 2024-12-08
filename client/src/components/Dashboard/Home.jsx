import { useEffect } from "react";
import { fetchUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, auth } = useSelector((state) => state.user);

  useEffect(() => {
    // If the user is not authenticated, fetch user data
    if (!auth) {
      dispatch(fetchUser());
    }
  }, [auth, dispatch]);

  // Redirect to login if user is not authenticated and not loading
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
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(fetchUser())}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || "User"}
      </Typography>
      <Typography variant="body1">
        Email: {user?.email || "Not available"}
      </Typography>
    </Box>
  );
};

export default Home;
