import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import loginPic from "../../assets/loginPic.jpg";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import { api } from "../../api/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
// import { fetchUser } from "../../redux/slices/authSl


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const validateForm = () => {
    const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

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
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await api.post("/users/login", { username, password });
        console.log(res);
        if(res.status === 200){
          dispatch(setUser(res.data.data.user))
          navigate("/dashboard")
        }
        // fetchUser(dispatch);
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
        ></Box>
      </Grid>

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
          <Typography
            variant="h4"
            mb={2}
            sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 700 }}
          >
            Welcome Back
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
              error={!!error}
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
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error && error.includes("Password") ? error : ""}
            />
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
            <Link to={"/register"} style={{ fontWeight: 500 }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
