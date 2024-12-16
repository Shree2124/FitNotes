import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import {
  FitnessCenter,
  Close,
  Menu,
  Assessment,
  ExitToApp,
  Home,
  Person2
} from "@mui/icons-material";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useThemeContext } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const secondaryColor = "#1a237e";
const textColor = "#e8eaf6";
const activeBgColor = "#3949ab";

const fontFamily = "'Poppins', sans-serif";

const Link = styled(RouterLink)`
  text-decoration: none;
  border-radius: 8px;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  color: ${textColor};
  font-family: ${fontFamily};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${activeBgColor};
  }
`;

const fitNotesTabs = [
  {
    name: "Home",
    path: "/dashboard",
    icon: <Home />
  },
  {
    name: "Workout Logs",
    path: "/dashboard/workouts",
    icon: <FitnessCenter />,
  },
  // {
  //   name: "Nutrition Tracking",
  //   path: "/dashboard/nutrition",
  //   icon: <Fastfood />,
  // },
  {
    name: "Progress Reports",
    path: "/dashboard/progress",
    icon: <Assessment />,
  },
  {
    name: "Goals",
    path: "/dashboard/goals",
    icon: <Assessment />,
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <Person2 />,
  },
];

const SideBar = ({ w = "100%", bgcolor = "", h = "" }) => {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const logoutHandler = () => {
    console.log("User logged out");
  };

  return (
    <Stack
      width={w}
      bgcolor={bgcolor || secondaryColor}
      height={h || "100vh"}
      direction={"column"}
      justifyContent={"space-between"}
      p={"2rem"}
      spacing={"2rem"}
      alignItems={"center"}
      sx={{
        color: textColor,
        fontFamily: fontFamily,
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.2)",
        position: "relative",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontFamily: "monospace",
        }}
      >
        <Logo alt={"Logo"} width={"4rem"} height={"4rem"} />
        FitNotes
      </Typography>

      <Stack spacing={"0.7rem"}>
        {fitNotesTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                bgcolor: activeBgColor,
                color: textColor,
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
      </Stack>

      <Stack className="pr-[5rem]">
        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"0.7rem"}>
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography>Theme</Typography>
        </Stack>

        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToApp />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const DashboardLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };

  return (
    <Grid
      container
      sx={{
        bgcolor: "#e8eaf6",
        fontFamily: fontFamily,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={handleMobile}
          sx={{
            color: secondaryColor,
            fontSize: "2rem",
          }}
        >
          {isMobile ? <Close /> : <Menu />}
        </IconButton>
      </Box>

      <Grid
        item
        md={3}
        lg={2.5}
        sx={{
          display: { xs: "none", md: "block" },
          height: "100vh",
        }}
      >
        <SideBar />
      </Grid>

      <Grid
        item
        xs={12}
        md={9}
        lg={9.5}
        sx={{
          bgcolor: "#f3f4f6",
          padding: "2rem",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        {children}
      </Grid>

      <Drawer
        open={isMobile}
        onClose={handleClose}
        PaperProps={{
          sx: {
            bgcolor: secondaryColor,
            width: "75vw",
          },
        }}
      >
        <SideBar w="75vw" />
      </Drawer>
    </Grid>
  );
};

export default DashboardLayout;
