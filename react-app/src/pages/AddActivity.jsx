import React from "react";
import CreateActivityForm from "../components/app/Activityhook";
import { Link } from "react-router-dom";
import { Container, TextField, MenuItem, Button, Typography, Select, FormControl, InputLabel } from "@mui/material";

const AddActivities = () => {
  const {
    name,
    setName,
    duration,
    setDuration,
    activity,
    setActivity,
    createActivity,
    message,
  } = CreateActivityForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newActivity = { name, duration, activity };
    console.log("Submitting:", newActivity);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
      {message && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Duration</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            label="Duration"
          >
            <MenuItem value="30 minutes">30 minutes</MenuItem>
            <MenuItem value="1 hour">1 hour</MenuItem>
            <MenuItem value="2 hours">2 hours</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Activity</InputLabel>
          <Select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            label="Activity"
          >
            <MenuItem value="">Select an activity</MenuItem>
            <MenuItem value="Walking">Walking</MenuItem>
            <MenuItem value="Running">Running</MenuItem>
            <MenuItem value="Cycling">Cycling</MenuItem>
            <MenuItem value="Dance">Dance</MenuItem>
            <MenuItem value="Swimming">Swimming</MenuItem>
            <MenuItem value="Football">Football</MenuItem>
            <MenuItem value="Yoga">Yoga</MenuItem>
            <MenuItem value="Boxing">Boxing</MenuItem>
          </Select>
        </FormControl>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 2 }}
          style={{ backgroundColor: "#FF5733" }}
          onClick={() => createActivity()}
        >
          Submit
        </Button>
      </form>

      <Button
        component={Link}
        to="/activity-card"
        variant="outlined"
        color="secondary"
        sx={{ mt: 3, width: "100%" }}
      >
        Back
      </Button>
    </Container>
  );
};

export default AddActivities;
