import { Box, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

// Define your custom fonts and theme styles
const customFontStyle = {
  fontFamily: "'Poppins', sans-serif",
};

const HeroSection = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          backgroundImage: "url('./src/assets/herosection.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          textAlign: "center",
          minHeight: "100vh",
        }}
      >
        <div className="bg-black h-screen absolute z-30 w-full opacity-[0.5]"></div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="z-50"
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              ...customFontStyle,
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            }}
          >
            Track Your Gym Workouts
          </Typography>

          <Typography
            variant="h6"
            paragraph
            sx={{
              ...customFontStyle,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Our app helps you store sets and reps, track your progress, and
            achieve your fitness goals. Keep your workouts organized and get the
            best results with our easy-to-use interface.
          </Typography>

          <Link to={"/login"}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                marginTop: "20px",
                padding: "10px 30px",
                fontSize: "1rem",
                backgroundColor: "#ff7043",
                "&:hover": {
                  backgroundColor: "#ff5722",
                },
                borderRadius: "50px",
              }}
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </Box>
    </div>
  );
};

export default HeroSection;
