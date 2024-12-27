import { useState } from "react";
import "./navbar.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../Logo/Logo";
import { useThemeContext } from "../../context/ThemeContext";

interface MenuItem {
  text: string;
  link: string;
}

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const menuItems: MenuItem[] = [
    { text: "Home", link: "/" },
    { text: "Login", link: "/login" },
    { text: "Register", link: "/register" },
  ];

  return (
    <>
      <AppBar
        sx={{
          zIndex: 50,
          position: "fixed",
          bgcolor: "transparent",
        }}
        style={{
          boxShadow: "none",
        }}
      >
        <Toolbar>
          {isMobile ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Logo
                src="./fitnotes2.svg"
                alt="FitNotes"
                width="150px"
                height="50px"
              />
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <Menu />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Logo
                src="./fitnotes2.svg"
                alt="FitNotes"
                width="150px"
                height="50px"
              />
              <Box className="flex gap-3">
                {menuItems.map((item) => (
                  <Button
                    sx={{
                      color: "white",
                      "&:hover": {
                        color: "orange",
                      },
                    }}
                    key={item.text}
                    href={item.link}
                  >
                    {item.text}
                  </Button>
                ))}
                <IconButton
                  onClick={toggleTheme}
                  sx={{
                    color: "orange",
                  }}
                >
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: isDarkMode ? "black" : "white",
            color: isDarkMode ? "white" : "black",
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
          role="presentation"
        >
          <Box>
            <IconButton
              sx={{
                color: isDarkMode ? "white" : "black",
              }}
              onClick={() => setDrawerOpen(false)}
            >
              <Close />
            </IconButton>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} component="a" href={item.link}>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: isDarkMode ? "white" : "black",
                      "&:hover": { color: isDarkMode ? "yellow" : "orange" },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ p: 2 }}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: isDarkMode ? "yellow" : "orange",
              }}
            >
              {isDarkMode ? (
                <Tooltip title={"Change theme"}>
                  <Brightness7Icon />
                </Tooltip>
              ) : (
                <Tooltip title={"Change theme"}>
                  <Brightness4Icon />
                </Tooltip>
              )}
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
