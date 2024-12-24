import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import loginPic from "../../assets/loginPic.jpg";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import { api } from "../../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    let isValid = true;

    if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
      setUsernameError("Username must be at least 3 alphanumeric characters.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least 1 letter and 1 number."
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await api.post("/users/login", { username, password });
        if (res.status === 200) {
          dispatch(setUser(res.data.data.user));
          navigate("/dashboard");
        } else {
          setGeneralError("Login failed. Please try again.");
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setGeneralError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Section with Background Image */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${loginPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
      </Grid>

      {/* Right Section with Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 3, sm: 6, md: 12 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            textAlign: "center",
            padding: { xs: "1.5rem", sm: "3rem" },
          }}
        >
          <Typography variant="h4" mb={2} fontWeight={700}>
            Welcome Back
          </Typography>
          <Typography variant="body2" mb={3} color="text.secondary">
            Log in to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!usernameError}
              helperText={usernameError}
              aria-describedby="username-error"
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
              aria-describedby="password-error"
            />
            <Typography
              variant="body2"
              color="error"
              sx={{ mt: 1, textAlign: "left" }}
            >
              {generalError}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            mt={3}
            mb={1}
            sx={{ color: "text.secondary" }}
          >
            Or log in with
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: { xs: 1, sm: 0 },
              }}
              onClick={() => alert("Google Login")}
            >
              <img
                src={google}
                alt="Google"
                width={20}
                style={{ marginRight: "8px" }}
              />
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => alert("Instagram Login")}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png"
                alt="Instagram"
                width={20}
                style={{ marginRight: "8px" }}
              />
              Instagram
            </Button>
          </Box>

          <Typography variant="body2" mt={3}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ fontWeight: 500 }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
