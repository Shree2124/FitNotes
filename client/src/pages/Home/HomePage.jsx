import { Box } from "@mui/material";
import { FeaturesSection, HeroSection, Navbar } from "../../components";
import { useThemeContext } from "../../context/ThemeContext";

const HomePage = () => {
  const { theme } = useThemeContext();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      <div>
        <Navbar />
      </div>
      <HeroSection />
      {/* <FeaturesSection /> */}
    </Box>
  );
};

export default HomePage;
