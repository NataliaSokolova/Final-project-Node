import Exercise from "../models/Exercise.js";
import FavExercise from "../models/FavExercise.js";
import { getStatusCode, StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { log } from "console";

import mongoose from "mongoose";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const getAllExs = async (req, res) =>{

  const filePath = path.join(__dirname, '../data/all_exs.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error("❌ Error reading file:", err);
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Failed to fetch exercises: ${err.message}` });
    }

  
      const jsonData = JSON.parse(data);
      res.status(StatusCodes.OK).json({ exs: jsonData });
      console.log("✅ Successfully fetched exercises:", jsonData);

      return res
   
  });
}


const createExs = async(req, res) => {
  req.body.createdByuser = req.user.userId;
  console.log("✅ Пользователь:", req.user); // Проверяем, есть ли userId

  const favexs = await Exercise.create(req.body);
  console.log("✅ упр:", favexs); // Проверяем, есть ли userId

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Exercise added to favorites.", exercise: favexs });
  
}


const addToFavorites = async(req, res) => {
  const {
    user: { userId },
    body: { favExs},
  } = req;

  const userObjectId = new mongoose.Types.ObjectId(userId);

  if (!favExs || !Array.isArray(favExs) || favExs.length === 0) {
    throw new BadRequestError("The 'favExs' field must be a non-empty array.");
  }

  const filter = { createdByuser: userObjectId };

  const updatedExercises = await FavExercise.findOneAndUpdate(
    filter,
    {
      // We might want to do some smarter updates than just overwrriting the whole array
      // $addToSet: { favExs: { $each: favExs } }, // Add missing items
      // $pull: { favExercises: { $in: ["b", "c"] } } // Remove unwanted items
      favExs: favExs
    },
    { upsert: true, new: true } // Creates a new record if one doesn't exist
  );

  if (!updatedExercises) {
    throw new NotFoundError(`No exercises found or updated`);
}


  res.status(StatusCodes.OK).json({ message: "Exercises added to favorites.", updatedExercises });
};



  // const exerciseData =  {
  //     ...req.body,
  //     userId: req.user.userId, 
  // } 

  // if (!exsId) {
  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ error: "Exercise ID is required." });
  // }

  // const url = `https://exercisedb.p.rapidapi.com/exercises/${exsId}`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "Sign Up for Key",
  //     "x-rapidapi-host": "exercisedb.p.rapidapi.com",
  //   },
  // };

  // const response = await fetch(url, options);
  // if (!response.ok) {
  //   return res
  //     .status(response.status)
  //     .json({ error: `Failed to fetch exercise: ${response.statusText}` });
  // }

  // const exerciseData = await response.json();

//   const exercise = await Exercise.create(exerciseData);

//   res
//     .status(StatusCodes.CREATED)
//     .json({ message: "Exercise added to favorites.", exercise: newExercise });
// };

// const getAllFavorites = async (req, res) => {
//   const { iserId } = req.user;

//   const favorites = await Exercise.find({ userId }).lean();

//   if (favorites.length === 0) {
//     return res
//       .status(StatusCodes.NOT_FOUND)
//       .json({ message: "No favorites found." });
//   }

//   res.status(StatusCodes.OK).json({ favorites });
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

export { getAllExs, createExs, addToFavorites};
