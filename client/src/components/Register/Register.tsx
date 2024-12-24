import {
  Box,
  Button,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import registerPic from "../../assets/register.jpg";
import { api } from "../../api/api";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [activationToken, setActivationToken] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);

  const handleClose = () => setModal(false);

  const handleOtp = async () => {
    try {
      const res = await api.post("/users/verify", { otp, activationToken });
      if (res.status === 200) {
        handleClose();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const validateForm = (): boolean => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await api.post("/users/register", {
          email,
          username,
          password,
        });
        if (res.status === 200) {
          setActivationToken(res.data.activationToken);
          setModal(true);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Section */}
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

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: { md: "2rem" },
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <Typography variant="h4" mb={2}>
            Create Account
          </Typography>
          <Typography variant="body2" mb={3}>
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
              onChange={handleInputChange(setEmail)}
              error={!!error && error.includes("email")}
              helperText={error && error.includes("email") ? error : ""}
            />
            <TextField
              fullWidth
              id="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={handleInputChange(setUsername)}
              error={!!error && error.includes("Username")}
              helperText={error && error.includes("Username") ? error : ""}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={handleInputChange(setPassword)}
              error={!!error && error.includes("Password")}
              helperText={error && error.includes("Password") ? error : ""}
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Register
            </Button>
          </form>

          <Typography variant="body2" mt={3}>
            Already have an account?{" "}
            <Link to={"/login"}>Log in</Link>
          </Typography>
        </Box>
      </Grid>

      {/* OTP Modal */}
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="otp-modal-title"
        aria-describedby="otp-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="otp-modal-title" variant="h6" gutterBottom>
            Enter OTP
          </Typography>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={otp}
            onChange={handleInputChange(setOtp)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleOtp}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};

export default Register;
