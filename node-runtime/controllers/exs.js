import Job from "../models/Job.js";
import { getStatusCode, StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";


const favorites = [];

const getAllExs = async (req, res) => {
  const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'Sign Up for Key',
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
  }; 

    const response = await fetch(url, options);
    const result = await response.json();
    res.status(StatusCodes.OK).json({ exs: result });

};

const addToFavorites = async(req,res) => {
  const { exerciseID } = req.body;

  const url = `https://exercisedb.p.rapidapi.com/exercises/${exsId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'Sign Up for Key', 
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
    },
  };
const response = await fetch(url, options);

if (!response.ok) {
  return res.status(response.status).json({ error: `Failed to fetch exercise: ${response.statusText}` });
}

const exercise = await response.json();

// Check if the exercise is already in favorites
const isAlreadyFavorite = favorites.some((fav) => fav.id === exercise.id);
if (isAlreadyFavorite) {
  return res.status(400).json({ message: 'Exercise is already in favorites.' });
}

// Add the exercise to the favorites list
favorites.push(exercise);

res.status(200).json({ message: 'Exercise added to favorites.', exercise });

console.error('Error adding exercise to favorites:', error.message);
res.status(500).json({ error: 'Failed to add exercise to favorites.' });
}


const getFavorites = (req, res) => {

  res.status(200).json({ favorites});

  console.error('Error fetching favorites:', error.message);
  res.status(500).json({ error: 'Failed to fetch favorites.' });
}

// const createJob = async (req, res) => {
//   req.body.createdBy = req.user.userId;
//   const job = await Job.create(req.body);
//   res.status(StatusCodes.CREATED).json({ job });
// };

// const updateJob = async (req, res) => {
//   const {
//     user: { userId },
//     params: { id: jobId },
//     body: { company, position },
//   } = req;

//   if (!company || !position) {
//     throw new BadRequestError("Company or Position fields cannot be empty");
//   }

//   const job = await Job.findByIdAndUpdate(
//     { _id: jobId, createdBy: userId },
//     req.body,
//     { new: true, runValidators: true }
//   );

//   if (!job) {
//     throw new NotFoundError(`No job with id found`);
//   }

//   res.status(StatusCodes.OK).json({ job });
// };

const deleteExs = async (req, res) => {
  const { exsId } = req.body; 

  // Remove the exercise from the favorites list
  const index = favorites.findIndex((fav) => fav.id === exsId);
  if (index === -1) {
    return res.status(404).json({ message: 'Exercise not found in favorites.' });
  }

  favorites.splice(index, 1);

  res.status(200).json({ message: 'Exercise removed from favorites.' });

  console.error('Error removing exercise from favorites:', error.message);
  res.status(500).json({ error: 'Failed to remove exercise from favorites.' });
}





export { getAllExs, addToFavorites, getFavorites, deleteExs};