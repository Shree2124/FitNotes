import { useState } from "react";
import { Button, Typography, Box, useTheme } from "@mui/material";

const AddForm = ({ type }) => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "workout" && name.trim() !== "") {
      console.log({ workout: { name } });
      alert("Workout Added Successfully!");
    } else if (type === "muscle" && name.trim() !== "") {
      console.log({ muscle: { name } });
      alert("Muscle Added Successfully!");
    } else {
      alert("Please fill in all required fields.");
    }
    setName("");
    setNote("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        maxWidth: "500px",
        margin: "2rem auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: theme.palette.primary.main,
          marginBottom: 3,
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
        }}
      >
        {type === "workout" ? "Add Workout" : "Add Muscle"}
      </Typography>

      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="name"
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: theme.palette.primary.main,
            marginBottom: "8px",
          }}
        >
          {type === "workout" ? "Workout Name" : "Muscle Name"}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.primary.main}`,
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          htmlFor="note"
          style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "600",
            color: theme.palette.primary.main,
            marginBottom: "8px",
          }}
        >
          Note
        </label>
        <input
          type="text"
          id="note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            color: theme.palette.primary.main,
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.primary.main}`,
            outline: "none",
            transition: "border-color 0.3s",
          }}
        />
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          color: theme.palette.primary.main,
          padding: 2,
          fontWeight: "bold",
          fontSize: 16,
          textTransform: "uppercase",
          letterSpacing: "0.1rem",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            transform: "scale(1.02)",
          },
        }}
      >
        {type === "workout" ? "Add Workout" : "Add Muscle"}
      </Button>
    </Box>
  );
};

export default AddForm;
