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
  Avatar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
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

  const menuItems = [
    { text: "Home", link: "/" },
    { text: "Login", link: "/login" },
    { text: "Register", link: "/register" },
  ];

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  const handleDropdownToggle = (event) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      console.log("User logged out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          // bgcolor: isDarkMode ? "#2C3E50" : "#FFFFFF",
          bgcolor: "transparent",
          color: "#FFFFFF",
          boxShadow: "none",
          zIndex: 1201,
        }}
      >
        <Toolbar>
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
            {isMobile ? (
              <IconButton
                color="inherit"
                onClick={() => handleDrawerToggle(true)}
              >
                <Menu />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {!auth ? (
                  menuItems.map((item) => (
                    <Button
                      key={item.text}
                      href={item.link}
                      sx={{
                        color: isDarkMode ? "#FFFFFF" : "#8fc1f3",
                        "&:hover": {
                          color: isDarkMode ? "#E0E0E0" : "#FF7043",
                        },
                      }}
                    >
                      {item.text}
                    </Button>
                  ))
                ) : (
                  <Box sx={{ position: "relative" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={
                          user.avatar ||
                          "https://www.w3schools.com/howto/img_avatar.png"
                        }
                        alt="User Avatar"
                        sx={{ width: 36, height: 36 }}
                      />
                      <Typography
                        sx={{ ml: 1, fontSize: "1rem", fontWeight: 500 }}
                      >
                        {user?.username || "User"}
                      </Typography>
                      <IconButton onClick={handleDropdownToggle}>
                        <FontAwesomeIcon
                          icon={isDropdownOpen ? faCaretUp : faCaretDown}
                          color={isDarkMode ? "#E0E0E0" : "#2C3E50"}
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
                          bgcolor: isDarkMode ? "#34495E" : "#F5F5F5",
                          boxShadow: 3,
                          borderRadius: 1,
                          zIndex: 1300,
                          minWidth: "150px",
                        }}
                      >
                        <Button
                          fullWidth
                          href="/dashboard/profile"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Profile
                        </Button>
                        <Button
                          fullWidth
                          href="/dashboard"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </Button>
                        <Button fullWidth onClick={handleLogout}>
                          Logout
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
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => handleDrawerToggle(false)}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            bgcolor: isDarkMode ? "#34495E" : "#FFFFFF",
          }}
        >
          <Box>
            <IconButton
              onClick={() => handleDrawerToggle(false)}
              sx={{ alignSelf: "flex-start" }}
            >
              <Close />
            </IconButton>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} component="a" href={item.link}>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: isDarkMode ? "#E0E0E0" : "#2C3E50",
                      "&:hover": { color: isDarkMode ? "#FFFFFF" : "#FF7043" },
                    }}
                  />
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
