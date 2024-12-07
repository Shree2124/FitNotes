import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import registerPic from "../../assets/register.jpg";
import { api } from "../../api/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activationToken, setActivationToken] = useState("");
  const [otp, setOtp] = useState("");

  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleOtp = async () => {
    console.log("Entered OTP:", otp);
    try {
      const res = await api.post("/users/verify", { otp, activationToken });
      // if (res.status === 200) {
        handleClose();
      // }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

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

  const handleSubmit = async (e) => {
    console.log("submitting form ");

    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await api.post("/users/register", {
          email,
          username,
          password,
        });
        console.log(res);
        if (res.status === 200) {
          setActivationToken(res.data.activationToken);
          setModal(true);
        }
      } catch (error) {
        console.log(error);
      }
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

      {modal && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="otp-modal-title"
          aria-describedby="otp-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "10%", // Top of the screen
              left: "50%",
              transform: "translate(-50%, 0)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography
              id="otp-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
            >
              Enter OTP
            </Typography>
            <TextField
              label="OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOtp}
            >
              Submit
            </Button>
          </Box>
        </Modal>
      )}
    </Grid>
  );
};

export default Register;
