import Exercise from "../models/Exercise.js";
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

// const createExs = async (req, res) => {
//   req.body.createdByuser = req.user.userId;

//   const favexs = await Exercise.create(req.body);

//   res
//     .status(StatusCodes.CREATED)
//     .json({ message: "Exercise added to favorites.", exercise: favexs });
// };


// const getAllExs = async (req, res) => {
//   const url = "https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0";
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//       "x-rapidapi-host": "exercisedb.p.rapidapi.com",
//     },
//   };

//   const response = await fetch(url, options);
//   if (!response.ok)
//     return res
//       .status(response.status)
//       .json({ error: `Failed to fetch exercises: ${response.statusText}` });

//   const result = await response.json();
//   res.status(StatusCodes.OK).json({ exs: result });
// };

// const deleteExs = async (req, res) => {
//   const {
//     user: { userId },
//     params: { exsID },
//   } = req;



//   const deleteExrs = await Exercise.findOneAndDelete({ exsID, userId });

//   if (!deleteExrs) {
//     return res
//       .status(StatusCodes.NOT_FOUND)
//       .json({ message: "Exercise not found" });
//   }

//   res
//     .status(StatusCodes.OK)
//     .json({ message: "Exercise successfully removed from favorites." });
// };

export {
  getAllExs,
  addToFavorites,
  getAllFavorites,
  deleteFavorites,
};
