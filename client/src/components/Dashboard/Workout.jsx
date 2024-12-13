import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";

const Workout = () => {
  const [muscles, setMuscles] = useState([]);

  const dummyMuscles = [
    { id: "1", name: "Chest", image: "https://via.placeholder.com/150?text=Chest", smallImage: "https://via.placeholder.com/50?text=Ex1" },
    { id: "2", name: "Biceps", image: "https://via.placeholder.com/150?text=Biceps", smallImage: "https://via.placeholder.com/50?text=Ex2" },
    { id: "3", name: "Legs", image: "https://via.placeholder.com/150?text=Legs", smallImage: "https://via.placeholder.com/50?text=Ex3" },
    { id: "4", name: "Back", image: "https://via.placeholder.com/150?text=Back", smallImage: "https://via.placeholder.com/50?text=Ex4" },
    { id: "5", name: "Shoulders", image: "https://via.placeholder.com/150?text=Shoulders", smallImage: "https://via.placeholder.com/50?text=Ex5" },
  ];

  
  useEffect(() => {
    setMuscles(dummyMuscles); // TODO: actual API call 
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginBottom: 4 }}>
        Workout Muscles
      </Typography>
      <Grid container spacing={3}>
        {muscles.map((muscle) => (
          <Grid item xs={12} sm={6} md={4} key={muscle.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "transform 0.2s", '&:hover': { transform: "scale(1.05)" } }}>
              {/* <CardMedia
                component="img"
                height="140"
                image={muscle.image}
                alt={muscle.name}
              /> */}
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {muscle.name}
                </Typography>
                <img
                  src={muscle.smallImage}
                  alt={`${muscle.name} Exercise`}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Workout;
