import { Box } from "@mui/material";
import { HeroSection, Navbar } from "../../components";
import { useThemeContext } from "../../context/ThemeContext";

const HomePage: React.FC = () => {
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
      {/* <div className="w-full">
        <FeaturesSection />
      </div>
      <div className="w-full">
        <TestimonialsSection />
      </div>
      <div className="w-full">
        <Footer />
      </div> */}
    </Box>
  );
};

export default HomePage;
