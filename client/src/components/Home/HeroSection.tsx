import {
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Slider from "react-slick";
import { useThemeContext } from "../../context/ThemeContext";
import { img1, img2, img3 } from "./image";

interface ThemeContextType {
  theme: {
    palette: {
      primary: {
        main: string;
      };
      secondary: {
        main: string;
      };
      text: {
        primary: string;
        secondary: string;
      };
    };
    spacing: (factor: number) => string;
  };
}

const HeroSection: React.FC = () => {
  const { theme } = useThemeContext() as ThemeContextType;
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("md"));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      component="section"
      sx={{
        pt: "6rem",
        height: { lg: "100vh" },
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        background: `linear-gradient(70deg, #2c0246 10%, #6e476c 90%)`,
        color: "white",
        overflow: "hidden",
        padding: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          mt: "3rem",
          width: isSmallScreen ? "100%" : "60%",
          textAlign: isSmallScreen ? "center" : "left",
          padding: isSmallScreen ? theme.spacing(2) : theme.spacing(6),
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            mb: theme.spacing(2),
            color: "white",
            letterSpacing: "2px",
          }}
        >
          Track Your Fitness Journey
        </Typography>

        <Typography
          variant="h6"
          sx={{
            maxWidth: 600,
            mb: theme.spacing(4),
            color: "white",
            mx: isSmallScreen ? "auto" : "unset",
          }}
        >
          Unlock your potential with powerful tools designed to help you
          monitor, analyze, and achieve your fitness goals.
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
              color: "white",
            },
            "&::before": {
              textAlign: "center",
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              backgroundColor: "#870dd3",
              zIndex: 0,
              transition: "left 0.4s ease-in-out",
            },
            "&:hover::before": {
              content: '"->"',
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
      </Box>

      <Box
        sx={{
          width: isSmallScreen ? "100%" : "40%",
          height: isSmallScreen ? "50vh" : "100%",
          overflow: "hidden",
          mt: isSmallScreen ? theme.spacing(5) : 0,
        }}
      >
        <Slider {...sliderSettings}>
          <img
            src={img1}
            alt="Slide 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <img
            src={img2}
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <img
            src={img3}
            alt="Slide 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Slider>
      </Box>
    </Box>
  );
};

export default HeroSection;
