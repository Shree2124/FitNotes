import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Modal,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {AddForm} from "../index"
import chest from "../../assets/chest.jpg";
import shoulder from "../../assets/shoulder.jpg";
import legs from "../../assets/legs.jpg";
import bicep from "../../assets/bicep.jpg";
import back from "../../assets/back.jpg";
import abs from "../../assets/abs.jpg";
import cardio from "../../assets/cardio.jpg";
import triceps from "../../assets/triceps.webp";

const Workout = () => {
  const [muscles, setMuscles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setMuscles(dummyMuscles); // TODO: Replace with an actual API call
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
        backgroundColor: "#f9f9f9",
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
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
          Workout Muscles
        </Typography>
        <IconButton
          onClick={() => setIsModalOpen(true)}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": {
              backgroundColor: "#115293",
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
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
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
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <AddForm
            type="muscle"
            onSubmit={(newMuscle) => handleAddMuscle(newMuscle)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Workout;
