import Activity from "../models/Activity.js";
import FavExercise from "../models/FavExercise.js";
import { getStatusCode, StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getAllExs = async (req, res) => {
  const filePath = path.join(__dirname, "../data/all_exs.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Failed to fetch exercises: ${err.message}` });
    }

    const jsonData = JSON.parse(data);
    res.status(StatusCodes.OK).json({ exs: jsonData });
    return res;
  });
};

const addToFavorites = async (req, res) => {
  const {
    user: { userId },
    body: { exerciseId },
  } = req;

  if (!exerciseId) {
    throw new BadRequestError("exerciseId not provided.");
  }

  const filter = { createdByuser: userId };

  const updatedExercises = await FavExercise.findOneAndUpdate(
    filter,
    {
      $addToSet: { favExs: exerciseId },
    },
    { upsert: true, new: true } // Creates a new record if one doesn't exist
  );

  if (!updatedExercises) {
    throw new NotFoundError(`No exercises found or updated`);
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Exercises added to favorites.", updatedExercises });
};

const getAllFavorites = async (req, res) => {
  const { userId } = req.user;

  const filter = { createdByuser: userId };
  const favorites = await FavExercise.findOne(filter).select("favExs");

  if (!favorites || !favorites.favExs) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No favorites found." });
  }
  res.status(StatusCodes.OK).json({ favExs: favorites.favExs });
};

const deleteFavorites = async (req, res) => {
  const {
    user: { userId },
    body: { exerciseId },
  } = req;

  const filter = { createdByuser: userId };

  const updatedExercises = await FavExercise.findOneAndUpdate(
    filter,
    {
      $pull: { favExs: exerciseId },
    },
    { new: true } // Return the updated document
  );

  if (!updatedExercises) {
    throw new NotFoundError("No exercises found or updated");
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "Exercise removed from favorites.", updatedExercises });
};

// crud for activities

const getAllActivities = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const filter = { createdByuser: req.user.userId };
    const activities = await Activity.find(filter)

    res.status(201).json({ success: true, data: activities });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Server error. Could not create activity." });
  }
};

const createActivity = async (req, res) => {
  try {
    const { name, duration, activity } = req.body;
   
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const newActivity = await Activity.create({
      name,
      duration,
      activity,
      createdByuser: req.user.userId,
    });

    res.status(201).json({ success: true, data: newActivity });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(500).json({ error: "Server error. Could not create activity." });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params; 
    const { name, duration, activity } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    const activityFound = await Activity.findById(id);
    if (!activityFound) {
      return res.status(404).json({ error: "Activity not found." });
    }
    // Check if the authenticated user is the creator of the activity
    if (activityFound.createdByuser.toString() !== req.user.userId) {
      return res.status(403).json({ error: "You are not authorized to update this activity." });
    }
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { name, duration, activity },
      { new: true, runValidators: true } 
    );
 
    res.status(200).json({ success: true, data: updatedActivity });
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ error: "Server error. Could not update activity." });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if ID is provided and is a valid ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid or missing Activity ID" });
    }

    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found." });
    }

    res.json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ error: "Server error" });
  }
};





export {
  getAllExs,
  addToFavorites,
  getAllFavorites,
  deleteFavorites,
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
};
