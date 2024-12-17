import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const AddForm = ({ type }) => {
  const [name, setName] = useState('');
  const [defaultExercises, setDefaultExercises] = useState('');

  // TODO:Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'workout' && name.trim() !== '') {
      console.log({ workout: { name } });
      alert('Workout Added Successfully!');
    } else if (type === 'muscle' && name.trim() !== '' && defaultExercises.trim() !== '') {
      console.log({ muscle: { name, defaultExercises } });
      alert('Muscle Added Successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
    setName('');
    setDefaultExercises('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto mt-10"
    >
      <Typography variant="h5" className="mb-4 text-center">
        {type === 'workout' ? 'Add Workout' : 'Add Muscle'}
      </Typography>

      <TextField
        label={type === 'workout' ? 'Workout Name' : 'Muscle Name'}
        variant="outlined"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mb-4"
      />

      {type === 'muscle' && (
        <TextField
          label="Default Exercises"
          variant="outlined"
          fullWidth
          value={defaultExercises}
          onChange={(e) => setDefaultExercises(e.target.value)}
          required
          className="mb-4"
        />
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="w-full"
      >
        {type === 'workout' ? 'Add Workout' : 'Add Muscle'}
      </Button>
    </Box>
  );
};

export default AddForm;
