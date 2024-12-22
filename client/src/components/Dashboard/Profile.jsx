import { useState } from "react";
import {
  Avatar,
  Grid,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

const Profile = () => {
  const { theme } = useThemeContext();

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          padding: 4,
          borderRadius: "8px",
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid
            item
            xs={12}
            sm={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.primary.main,
                fontSize: 28,
              }}
              src="https://via.placeholder.com/150"
              alt="Profile Picture"
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              John Doe
            </Typography>
            <Typography variant="body1" gutterBottom>
              johndoe@example.com
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Member since January 2023
            </Typography>
            <Button
              onClick={handleEdit}
              sx={{
                marginTop: "16px",
                backgroundColor: theme.palette.primary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Personal Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Full Name
            </Typography>
            <input
              type="text"
              defaultValue="John Doe"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                !isEditing ? "bg-gray-200" : "bg-white border-gray-300"
              }`}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Email
            </Typography>
            <input
              type="email"
              defaultValue="johndoe@example.com"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                !isEditing ? "bg-gray-200" : "bg-white border-gray-300"
              }`}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Address
            </Typography>
            <input
              type="text"
              placeholder="Enter your address"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg ${
                !isEditing ? "bg-gray-200" : "bg-white border-gray-300"
              }`}
            />
          </Grid>
        </Grid>

        {isEditing && (
          <Grid container justifyContent="flex-start" sx={{ marginTop: 3 }}>
            <Button
              sx={{
                backgroundColor: theme.palette.success.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              Save Changes
            </Button>
          </Grid>
        )}

        <Divider sx={{ my: 6 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Activity Overview
        </Typography>
        <Typography variant="body1" gutterBottom>
          Last Login: December 20, 2024
        </Typography>
        <Typography variant="body1" gutterBottom>
          Account Status:{" "}
          <span style={{ color: "#4caf50", fontWeight: "bold" }}>Active</span>
        </Typography>

        <Divider sx={{ my: 6 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Preferences
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Theme:</strong> Dark Mode
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Notifications:</strong> Enabled
        </Typography>

        <Divider sx={{ my: 6 }} />

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Security & Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              sx={{
                backgroundColor: theme.palette.warning.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.warning.dark,
                },
              }}
            >
              Change Password
            </Button>
          </Grid>
          <Grid item>
            <Button
              sx={{
                backgroundColor: theme.palette.error.main,
                color: "white",
                "&:hover": {
                  backgroundColor: theme.palette.error.dark,
                },
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Profile;
