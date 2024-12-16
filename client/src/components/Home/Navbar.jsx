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
  Avatar,
  Typography,
} from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useThemeContext } from "../../context/ThemeContext";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useThemeContext();
  const { auth, user } = useSelector((state) => state.user);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      // Add your logout API call here
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Login", link: "/login" },
    { text: "Register", link: "/register" },
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: "transparent", color: "white", zIndex: 1201 }}>
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Logo src="./fitnotes2.svg" alt="FitNotes" width="150px" height="50px" />
            {isMobile ? (
              <IconButton color="inherit" onClick={() => handleDrawerToggle(true)}>
                <Menu />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {!auth ? (
                  menuItems.map((item) => (
                    <Button key={item.text} color="inherit" href={item.link}>
                      {item.text}
                    </Button>
                  ))
                ) : (
                  <Box position="relative">
                    <Box display="flex" alignItems="center">
                      <Avatar
                        src={user.avatar || "https://www.w3schools.com/howto/img_avatar.png"}
                        alt="User Avatar"
                      />
                      <Typography sx={{ ml: 1 }}>{user?.username || "User"}</Typography>
                      <IconButton onClick={handleDropdownToggle}>
                        <FontAwesomeIcon
                          icon={isDropdownOpen ? faCaretUp : faCaretDown}
                          color="white"
                        />
                      </IconButton>
                    </Box>
                    {isDropdownOpen && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          mt: 1,
                          bgcolor: "background.paper",
                          boxShadow: 3,
                          borderRadius: 1,
                          zIndex: 1300,
                        }}
                      >
                        <Button fullWidth href="/profile" onClick={() => setDropdownOpen(false)}>
                          Profile
                        </Button>
                        <Button fullWidth onClick={handleLogout}>
                          Logout
                        </Button>
                        <Button fullWidth href="/user/dashboard" onClick={() => setDropdownOpen(false)}>
                          Dashboard
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
                <IconButton onClick={toggleTheme} color="inherit">
                  {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => handleDrawerToggle(false)}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <IconButton onClick={() => handleDrawerToggle(false)} sx={{ alignSelf: "flex-start" }}>
              <Close />
            </IconButton>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} component="a" href={item.link}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box sx={{ p: 2, textAlign: "center" }}>
            <IconButton onClick={toggleTheme} color="inherit">
              {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
