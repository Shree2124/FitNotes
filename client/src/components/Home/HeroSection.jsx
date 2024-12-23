import { Button, Typography, Box } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

const HeroSection = () => {
  const { theme } = useThemeContext();

  return (
    <Box
      component="section"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        py: theme.spacing(12),
        px: theme.spacing(2),
        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        color: theme.palette.text.primary,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: theme.spacing(2),
          color: "white",
        }}
      >
        Track Your Fitness Journey
      </Typography>

      <Typography
        variant="h6"
        sx={{
          maxWidth: 600,
          mb: theme.spacing(4),
          color: theme.palette.text.secondary,
        }}
      >
        Unlock your potential with powerful tools designed to help you monitor,
        analyze, and achieve your fitness goals.
      </Typography>

      <Button
        variant="contained"
        sx={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "white",
          color: "#1976d2",
          px: theme.spacing(4),
          py: theme.spacing(1.5),
          fontWeight: "bold",
          textTransform: "none",
          transition: "color 0.3s ease-in-out",
          "&:hover": {
            color: "white", // Changes text color on hover
          },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            backgroundColor: "#1976d2",
            zIndex: 0,
            transition: "left 0.4s ease-in-out", 
          },
          "&:hover::before": {
            left: 0, 
          },
          "& span": {
            position: "relative",
            zIndex: 1, 
          },
        }}
        href="/login"
      >
        <span>Get Started</span>
      </Button>

      {/* <Box
        component={motion.div}
        initial={{ y: -20 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        sx={{
          mt: theme.spacing(4),
        }}
      >
        <img
          src="./fitnotes2.svg"
          alt="Fitness Icon"
          style={{
            width: 50,
            height: 50,
            margin: "0 auto",
          }}
        />
      </Box> */}
    </Box>
  );
};

export default HeroSection;
