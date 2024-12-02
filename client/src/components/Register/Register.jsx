import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import registerPic from "../../assets/register.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!usernameRegex.test(username)) {
      setError("Username must be at least 3 alphanumeric characters.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least 1 letter and 1 number."
      );
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registration Form Submitted");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${registerPic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black h-full opacity-[0.5]"></div>
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: {
            md: "6rem",
            lg: "6rem",
          },
        }}
      >
        <Box
          className="sm:p-12"
          sx={{
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            padding: {
              sm: "3rem",
            },
          }}
        >
          <Typography
            variant="h4"
            mb={2}
            sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            mb={3}
            sx={{
              fontFamily: "'Roboto', sans-serif",
              color: "text.secondary",
              fontSize: "0.95rem",
            }}
          >
            Sign up to get started
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && error.includes("email")}
              helperText={error && error.includes("email") ? error : ""}
              sx={{ fontFamily: "'Roboto', sans-serif" }}
            />
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error && error.includes("Username")}
              helperText={error && error.includes("Username") ? error : ""}
              sx={{ fontFamily: "'Roboto', sans-serif" }}
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
              error={!!error && error.includes("Password")}
              helperText={error && error.includes("Password") ? error : ""}
              sx={{ fontFamily: "'Roboto', sans-serif" }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
              }}
            >
              Register
            </Button>
          </form>

          <Typography
            variant="body2"
            mt={3}
            sx={{ fontFamily: "'Roboto', sans-serif" }}
          >
            Already have an account?{" "}
            <Link
              to={"/login"}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Log in
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
