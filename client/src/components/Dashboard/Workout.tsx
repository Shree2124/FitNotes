import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { workouts } from '../constants/sampleData';

type WorkoutType = {
  id: string;
  name: string;
};



const Workout: React.FC = () => {
  const { muscleName } = useParams<{ muscleName: string }>();

  const muscleData = workouts.find(
    (muscle) => muscle.name.toLowerCase() === muscleName?.toLowerCase()
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutType | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, workout: WorkoutType) => {
    setAnchorEl(event.currentTarget);
    setSelectedWorkout(workout);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedWorkout(null);
  };

  const handleEdit = () => {
    console.log("Edit", selectedWorkout);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Delete", selectedWorkout);
    handleMenuClose();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {muscleData ? (
        <>
          <Typography variant="h4" gutterBottom>
            {muscleData.name} Workouts
          </Typography>
          <Stack spacing={2}>
            {muscleData.workouts.map((workout) => (
              <Box
                key={workout.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 2,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  bgcolor: '#f9f9f9',
                }}
              >
                <Typography variant="h6">{workout.name}</Typography>
                <IconButton
                  aria-label="more options"
                  onClick={(e) => handleMenuOpen(e, workout)}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            ))}
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ) : (
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" color="error">
            Muscle group not found
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Workout;
