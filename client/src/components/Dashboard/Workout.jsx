import { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar, IconButton, Modal, Button } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import { AddForm } from "../index";
import chest from "../../assets/chest.jpg";
import shoulder from "../../assets/shoulder.jpg";
import legs from "../../assets/legs.jpg";
import bicep from "../../assets/bicep.jpg";
import back from "../../assets/back.jpg";
import abs from "../../assets/abs.jpg";
import cardio from "../../assets/cardio.jpg";
import triceps from "../../assets/triceps.webp";
import { useThemeContext } from '../../context/ThemeContext'; // Import the custom hook

const Workout = () => {
  const [muscles, setMuscles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isDarkMode, toggleTheme, theme } = useThemeContext(); // Access theme context

  const dummyMuscles = [
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

  const handleAddMuscle = (newMuscle) => {
    const updatedMuscles = [
      ...muscles,
      {
        id: muscles.length + 1,
        name: newMuscle.name,
        smallImage: triceps,
      },
    ];
    setMuscles(updatedMuscles);
    setIsModalOpen(false);
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
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: theme.palette.text.primary }}>
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
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
                  {muscle.name}
                </Typography>
                <Avatar
                  src={muscle.smallImage}
                  alt={`${muscle.name} Exercise`}
                  sx={{
                    width: { xs: "3rem", sm: "5rem" },
                    height: { xs: "3rem", sm: "5rem" },
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
          <IconButton sx={{
            position: "absolute",
            right: "1.7rem",
            top: "1rem"
          }} onClick={() => setIsModalOpen(false)}>
            <Close />
          </IconButton>
          <AddForm
            type="exercise"
            onSubmit={(newMuscle) => handleAddMuscle(newMuscle)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Workout;
