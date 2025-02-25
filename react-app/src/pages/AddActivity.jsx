import React from "react";
import CreateActivityForm from "../components/app/Activityhook";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  MenuItem,
  Button,
  Typography,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

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
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}
    >
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
            <MenuItem value="">Select duration</MenuItem>
            <MenuItem value="5 minutes">5 minutes</MenuItem>
            <MenuItem value="10 minutes">10 minutes</MenuItem>
            <MenuItem value="15 minutes">15 minutes</MenuItem>
            <MenuItem value="20 minutes">20 minutes</MenuItem>
            <MenuItem value="25 minutes">25 minutes</MenuItem>
            <MenuItem value="30 minutes">30 minutes</MenuItem>
            <MenuItem value="35 minutes">35 minutes</MenuItem>
            <MenuItem value="40 minutes">40 minutes</MenuItem>
            <MenuItem value="45 minutes">45 minutes</MenuItem>
            <MenuItem value="50 minutes">50 minutes</MenuItem>
            <MenuItem value="55 minutes">55 minutes</MenuItem>
            <MenuItem value="1 hour">1 hour</MenuItem>
            <MenuItem value="1 hour 15 minutes">1 hour 15 minutes</MenuItem>
            <MenuItem value="1 hour 30 minutes">1 hour 30 minutes</MenuItem>
            <MenuItem value="1 hour 45 minutes">1 hour 45 minutes</MenuItem>
            <MenuItem value="2 hours">2 hours</MenuItem>
            <MenuItem value="2 hours 30 minutes">2 hours 30 minutes</MenuItem>
            <MenuItem value="3 hours">3 hours</MenuItem>
            <MenuItem value="3 hours 30 minutes">3 hours 30 minutes</MenuItem>
            <MenuItem value="4 hours">4 hours</MenuItem>
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
            <MenuItem value="Swimming">Swimming</MenuItem>
            <MenuItem value="Yoga">Yoga</MenuItem>
            <MenuItem value="Pilates">Pilates</MenuItem>
            <MenuItem value="Stretching">Stretching</MenuItem>
            <MenuItem value="Jump Rope">Jump Rope</MenuItem>
            <MenuItem value="Dancing">Dancing</MenuItem>
            <MenuItem value="Zumba">Zumba</MenuItem>
            <MenuItem value="Aerobics">Aerobics</MenuItem>
            <MenuItem value="Strength Training">Strength Training</MenuItem>
            <MenuItem value="CrossFit">CrossFit</MenuItem>
            <MenuItem value="Bodybuilding">Bodybuilding</MenuItem>
            <MenuItem value="Martial Arts">Martial Arts</MenuItem>
            <MenuItem value="Boxing">Boxing</MenuItem>
            <MenuItem value="Kickboxing">Kickboxing</MenuItem>
            <MenuItem value="Judo">Judo</MenuItem>
            <MenuItem value="Karate">Karate</MenuItem>
            <MenuItem value="Taekwondo">Taekwondo</MenuItem>
            <MenuItem value="MMA">MMA</MenuItem>
            <MenuItem value="Wrestling">Wrestling</MenuItem>
            <MenuItem value="Tennis">Tennis</MenuItem>
            <MenuItem value="Table Tennis">Table Tennis</MenuItem>
            <MenuItem value="Badminton">Badminton</MenuItem>
            <MenuItem value="Squash">Squash</MenuItem>
            <MenuItem value="Golf">Golf</MenuItem>
            <MenuItem value="Basketball">Basketball</MenuItem>
            <MenuItem value="Football">Football</MenuItem>
            <MenuItem value="Soccer">Soccer</MenuItem>
            <MenuItem value="Rugby">Rugby</MenuItem>
            <MenuItem value="Volleyball">Volleyball</MenuItem>
            <MenuItem value="Handball">Handball</MenuItem>
            <MenuItem value="Hockey">Hockey</MenuItem>
            <MenuItem value="Baseball">Baseball</MenuItem>
            <MenuItem value="Softball">Softball</MenuItem>
            <MenuItem value="Skateboarding">Skateboarding</MenuItem>
            <MenuItem value="Parkour">Parkour</MenuItem>
            <MenuItem value="Rollerblading">Rollerblading</MenuItem>
            <MenuItem value="Skiing">Skiing</MenuItem>
            <MenuItem value="Snowboarding">Snowboarding</MenuItem>
            <MenuItem value="Ice Skating">Ice Skating</MenuItem>
            <MenuItem value="Surfing">Surfing</MenuItem>
            <MenuItem value="Windsurfing">Windsurfing</MenuItem>
            <MenuItem value="Kitesurfing">Kitesurfing</MenuItem>
            <MenuItem value="Rowing">Rowing</MenuItem>
            <MenuItem value="Kayaking">Kayaking</MenuItem>
            <MenuItem value="Canoeing">Canoeing</MenuItem>
            <MenuItem value="Stand-Up Paddleboarding">
              Stand-Up Paddleboarding
            </MenuItem>
            <MenuItem value="Hiking">Hiking</MenuItem>
            <MenuItem value="Rock Climbing">Rock Climbing</MenuItem>
            <MenuItem value="Mountaineering">Mountaineering</MenuItem>
            <MenuItem value="Horseback Riding">Horseback Riding</MenuItem>
            <MenuItem value="Archery">Archery</MenuItem>
            <MenuItem value="Fencing">Fencing</MenuItem>
            <MenuItem value="Triathlon">Triathlon</MenuItem>
            <MenuItem value="Obstacle Course Racing">
              Obstacle Course Racing
            </MenuItem>
            <MenuItem value="Powerlifting">Powerlifting</MenuItem>
            <MenuItem value="Strongman">Strongman</MenuItem>
            <MenuItem value="Pole Dancing">Pole Dancing</MenuItem>
            <MenuItem value="Frisbee">Frisbee</MenuItem>
            <MenuItem value="Ultimate Frisbee">Ultimate Frisbee</MenuItem>
            <MenuItem value="Dodgeball">Dodgeball</MenuItem>
            <MenuItem value="Bocce">Bocce</MenuItem>
            <MenuItem value="Lacrosse">Lacrosse</MenuItem>
            <MenuItem value="Bowling">Bowling</MenuItem>
            <MenuItem value="Fishing">Fishing</MenuItem>
            <MenuItem value="Hunting">Hunting</MenuItem>
            <MenuItem value="Scuba Diving">Scuba Diving</MenuItem>
            <MenuItem value="Snorkeling">Snorkeling</MenuItem>
            <MenuItem value="Spearfishing">Spearfishing</MenuItem>
            <MenuItem value="Orienteering">Orienteering</MenuItem>
            <MenuItem value="Geocaching">Geocaching</MenuItem>
            <MenuItem value="Cyclocross">Cyclocross</MenuItem>
            <MenuItem value="BMX">BMX</MenuItem>
            <MenuItem value="Motocross">Motocross</MenuItem>
            <MenuItem value="Auto Racing">Auto Racing</MenuItem>
            <MenuItem value="Karting">Karting</MenuItem>
            <MenuItem value="Sailing">Sailing</MenuItem>
            <MenuItem value="Curling">Curling</MenuItem>
            <MenuItem value="Sumo Wrestling">Sumo Wrestling</MenuItem>
            <MenuItem value="Bouldering">Bouldering</MenuItem>
            <MenuItem value="Trail Running">Trail Running</MenuItem>
            <MenuItem value="Paragliding">Paragliding</MenuItem>
            <MenuItem value="Skydiving">Skydiving</MenuItem>
            <MenuItem value="Base Jumping">Base Jumping</MenuItem>
            <MenuItem value="Hang Gliding">Hang Gliding</MenuItem>
            <MenuItem value="Slacklining">Slacklining</MenuItem>
            <MenuItem value="Trampoline">Trampoline</MenuItem>
            <MenuItem value="Cheerleading">Cheerleading</MenuItem>
            <MenuItem value="Gymnastics">Gymnastics</MenuItem>
            <MenuItem value="Capoeira">Capoeira</MenuItem>
            <MenuItem value="Tai Chi">Tai Chi</MenuItem>
            <MenuItem value="Calisthenics">Calisthenics</MenuItem>
            <MenuItem value="Adventure Racing">Adventure Racing</MenuItem>
            <MenuItem value="Endurance Racing">Endurance Racing</MenuItem>
            <MenuItem value="Tug of War">Tug of War</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          borderRadius = '4px'
          fullWidth
          sx={{ mt: 2, fontWeight: '600' }}
          style={{ backgroundColor: "#7BC6FF" }}
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
        sx={{ mt: 3, width: "100%", fontWeight: '600' }}
      >
        Back
      </Button>
    </Container>
  );
};

export default AddActivities;
