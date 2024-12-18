import { useEffect } from "react";
import { fetchUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, auth } = useSelector((state) => state.user);
  const theme = useTheme();

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
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <CircularProgress color="primary" />
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
        sx={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          padding: theme.spacing(2),
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Error: {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(fetchUser())}
          sx={{
            padding: theme.spacing(1, 3),
            marginTop: theme.spacing(2),
          }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || "User"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {user?.email || "Not available"}
      </Typography>
    </Box>
  );
};

export default Home;
