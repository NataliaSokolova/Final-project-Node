import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CreateActivityForm from "../components/app/Activityhook";

export default function ActivityCard() {
  const {
    editActivity,
    fetchAllActivities,
    allActivities,
    name,
    setName,
    duration,
    setDuration,
    activity,
    setActivity,
    createActivity,
    message,
    deleteActivity,
  } = CreateActivityForm();

  const [openActivityId, setOpenActivityId] = useState(null);

  useEffect(() => {
    fetchAllActivities();
  }, []);

  const handleOpen = (id, activity) => {
    setOpenActivityId(id);
    setName(activity.name);
    setDuration(activity.duration);
    setActivity(activity.activity);
  };

  const handleClose = () => {
    setOpenActivityId(null);
  };

  const handleEditSubmit = async (id) => {
    try {
      await editActivity(id, { name, duration, activity });
      alert("Activity updated successfully!");
      handleClose(); // Close the modal
    } catch (error) {
      console.error("Failed to update activity:", error);
    }
  };

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        <Table sx={{ minWidth: 650, width: "100%", overflowX: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>Activity Name</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allActivities.map((activity) => (
              <TableRow
                key={activity._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {activity.name}
                </TableCell>
                <TableCell align="right">{activity.duration}</TableCell>
                <TableCell align="right">{activity.activity}</TableCell>

                <TableCell align="right">
                  <Button onClick={() => handleOpen(activity._id, activity)}>
                    <Button onClick={() => handleOpen(activity._id, activity)}>
                      <EditIcon />
                    </Button>
                  </Button>
                  <Modal
                    open={openActivityId === activity._id}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    BackdropProps={{
                      style: { backgroundColor: "transparent" },
                    }}
                  >
                    <Box sx={modalStyle}>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleEditSubmit(activity._id);
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          Edit Activity
                        </Typography>
                        <div>
                          <label>Name:</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label>Duration:</label>
                          <input
                            type="text"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                          />
                        </div>

                        <div>
                          <label>Activity:</label>
                          <select
                            value={activity}
                            onChange={(e) => {
                              setActivity(e.target.value);
                              console.log(
                                "Selected Activity: ",
                                e.target.value
                              );
                            }}
                          >
                            <option value="">Select an activity</option>
                            <option value="Walking">Walking</option>
                            <option value="Running">Running</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Dance">Dance</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Football">Football</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Boxing">Boxing</option>
                          </select>
                        </div>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Save
                        </Button>
                      </form>
                    </Box>
                  </Modal>
                </TableCell>

                <TableCell align="right">
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to remove this activity from favorites?"
                        )
                      ) {
                        deleteActivity(activity._id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Link to="/activity" style={addActivityButtonStyle}>
          Add Activity
        </Link>
      </TableContainer>
    </Box>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "400px",
  bgcolor: "background.paper",
  boxShadow: "0px 1px 8px #FEB079",
  p: 4,
};

const deleteButtonStyle = {
  backgroundColor: "#ffcccc",
  padding: "5px 10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const addActivityButtonStyle = {
  marginTop: "30px",
  marginLeft: "10px",
  backgroundColor: "#ffcccc",
  color: "white",
  width: "120px",
  height: "30px",
  borderRadius: "10%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  fontSize: "16px",

  "@media (max-width: 600px)": {
    width: "100px",
    height: "25px",
    fontSize: "14px",
  },
};
