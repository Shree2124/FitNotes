import React, { useState, useEffect, MouseEvent } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Modal,
  Menu,
  MenuItem,
  ButtonGroup,
  Button,
} from "@mui/material";
import { Add, Close, MoreVert } from "@mui/icons-material";
import { AddForm } from "../index";
import { useThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { api } from "../../api/api";

interface MuscleI {
  id: string;
  name: string;
  image: string;
  smallImage: string;
}

const Muscle: React.FC = () => {
  const [muscles, setMuscles] = useState<MuscleI[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleI | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { theme } = useThemeContext();

  useEffect(() => {
    if (user?.muscle) {
      setMuscles(user.muscle);
    }
  }, [user]);

  const handleMenuOpen = (
    event: MouseEvent<HTMLButtonElement>,
    muscle: MuscleI
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

  const handleDelete = (muscle: MuscleI) => {
    setShowDeleteModal(true);
    setSelectedMuscle(muscle);
    handleMenuClose();
  };

  const deleteMuscle = async () => {
    try {
      if (selectedMuscle) {
        await api.delete("/muscle/delete-muscle", {
          data: { name: selectedMuscle.name },
        });

        // Update the local state after deletion
        setMuscles((prev) =>
          prev.filter((muscle) => muscle.name !== selectedMuscle.name)
        );
        setShowDeleteModal(false);
        setSelectedMuscle(null);
      }
    } catch (error) {
      console.error("Failed to delete muscle:", error);
    }
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
            color: theme.palette.background.paper,
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
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                  }}
                >
                  {muscle.name}
                </Typography>
                <IconButton
                  onClick={(event) => handleMenuOpen(event, muscle)}
                  sx={{
                    color: theme.palette.primary.main,
                  }}
                >
                  <MoreVert />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={() => handleDelete(selectedMuscle!)}>
          Delete
        </MenuItem>
      </Menu>

      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
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
            onClick={() => setShowDeleteModal(false)}
          >
            <Close />
          </IconButton>
          <Typography>Are you sure you want to delete this muscle?</Typography>
          <ButtonGroup sx={{ mt: 2 }}>
            <Button
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedMuscle(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={deleteMuscle}>Delete</Button>
          </ButtonGroup>
        </Box>
      </Modal>

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

export default Muscle;
