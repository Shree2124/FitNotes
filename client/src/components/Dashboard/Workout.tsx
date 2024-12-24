import React, { useState, useEffect, MouseEvent } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Modal,
  Menu,
  MenuItem,
} from "@mui/material";
import { Add, Close, MoreVert } from "@mui/icons-material";
import { AddForm } from "../index";
import chest from "../../assets/chest.jpg";
import shoulder from "../../assets/shoulder.jpg";
import legs from "../../assets/legs.jpg";
import bicep from "../../assets/bicep.jpg";
import back from "../../assets/back.jpg";
import abs from "../../assets/abs.jpg";
import cardio from "../../assets/cardio.jpg";
import triceps from "../../assets/triceps.webp";
import { useThemeContext } from "../../context/ThemeContext";

// Define types for muscle data
interface Muscle {
  id: string;
  name: string;
  image: string;
  smallImage: string;
}

const Workout: React.FC = () => {
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for the menu anchor
  const [selectedMuscle, setSelectedMuscle] = useState<Muscle | null>(null); // State for the selected muscle

  const { theme } = useThemeContext();

  const dummyMuscles: Muscle[] = [
    { id: "1", name: "Abs", image: "", smallImage: abs },
    { id: "2", name: "Back", image: "", smallImage: back },
    { id: "3", name: "Biceps", image: "", smallImage: bicep },
    { id: "4", name: "Cardio", image: "", smallImage: cardio },
    { id: "5", name: "Chest", image: "", smallImage: chest },
    { id: "6", name: "Legs", image: "", smallImage: legs },
    { id: "7", name: "Shoulders", image: "", smallImage: shoulder },
    { id: "8", name: "Triceps", image: "", smallImage: triceps },
  ];

  useEffect(() => {
    setMuscles(dummyMuscles); // TODO: Replace with actual API call if needed
  }, []);

  const handleMenuOpen = (
    event: MouseEvent<HTMLButtonElement>,
    muscle: Muscle
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedMuscle(muscle);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMuscle(null);
  };

  const handleEdit = () => {
    console.log("Edit:", selectedMuscle);
    handleMenuClose();
  };

  const handleDelete = () => {
    setMuscles(muscles.filter((muscle) => muscle.id !== selectedMuscle?.id));
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 },
        backgroundColor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 5,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", color: theme.palette.text.primary }}
        >
          Workout Muscles
        </Typography>

        <IconButton
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: "primary.main",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            boxShadow: 2,
            transition: "transform 0.3s",
            "&:active": {
              transform: "scale(0.9)",
            },
          }}
        >
          <Add />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {muscles.map((muscle) => (
          <Grid item xs={12} sm={6} md={4} key={muscle.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.05)" },
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  {muscle.name}
                </Typography>
                <div>
                  <Avatar
                    src={muscle.smallImage}
                    alt={`${muscle.name} Exercise`}
                    sx={{
                      width: { xs: "3rem", sm: "5rem" },
                      height: { xs: "3rem", sm: "5rem" },
                    }}
                  />
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, muscle)}
                    sx={{
                      position: "relative",
                      right: "0",
                      left: { lg: "3rem", sm: "3rem" },
                      paddingTop: "1rem",
                      paddingBottom: "0",
                    }}
                  >
                    <MoreVert />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: theme.palette.background.paper,
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            sx={{
              color: theme.palette.text.primary,
              position: "absolute",
              right: "1.7rem",
              top: "1rem",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <Close />
          </IconButton>
          <AddForm type="muscle" />
        </Box>
      </Modal>
    </Box>
  );
};

export default Workout;
