import { useState } from "react";
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

  // TypeScript fix: define the type of the parameter for toggleDrawer
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
          zIndex: "50",
          position: "fixed",
          bgcolor: "transparent",
          color: "white",
        }}
      >
        <Toolbar>
          {isMobile ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>
                  <Logo
                    src="./fitnotes2.svg"
                    alt="FitNotes"
                    width="150px"
                    height="50px"
                  />
                </div>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <Menu />
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div>
                <Logo
                  src="./fitnotes2.svg"
                  alt="FitNotes"
                  width="150px"
                  height="50px"
                />
              </div>
              <div className="flex gap-3">
                {menuItems.map((item) => (
                  <Button key={item.text} color="inherit" href={item.link}>
                    {item.text}
                  </Button>
                ))}
                <IconButton onClick={toggleTheme} color="inherit">
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </div>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "baseline",
            justifyContent: "space-between",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div>
            <IconButton
              sx={{
                color: "white",
              }}
              onClick={() => setDrawerOpen(false)}
            >
              <Close />
            </IconButton>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} component="a" href={item.link}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className="mb-4 pl-5">
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
