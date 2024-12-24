import { useState, FormEvent } from "react";
import { Button, Typography, Box, useTheme, CircularProgress } from "@mui/material";
import useApi from "../../hooks/useApi";

interface AddFormProps {
  type: "workout" | "muscle";
}

const AddForm: React.FC<AddFormProps> = ({ type }) => {
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const theme = useTheme();
  const { loading, error, callApi } = useApi();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === "workout" && name.trim() !== "") {
      console.log({ workout: { name } });
      alert("Workout Added Successfully!");
    } else if (type === "muscle" && name.trim() !== "") {
      const response = await callApi({
        url: "/muscle/add-muscle",
        method: "POST",
        body: { name, note },
      });
      console.log(response);
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

      {error && (
        <div
          style={{
            color: "red",
            fontSize: "14px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

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
        <textarea
          id="note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            borderRadius: "8px",
            border: `1px solid ${theme.palette.primary.main}`,
            outline: "none",
            transition: "border-color 0.3s",
          }}
        ></textarea>
      </div>

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.paper,
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
        {loading ? <CircularProgress size={24} color="inherit" /> : type === "workout" ? "Add Workout" : "Add Muscle"}
      </Button>
    </Box>
  );
};

export default AddForm;
