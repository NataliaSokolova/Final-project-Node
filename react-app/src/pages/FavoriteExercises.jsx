import React, { useEffect } from 'react';
import useExercises from './Exercises';

import { Button, Stack, Typography , Box} from '@mui/material';

const FavoriteExercises = () => {
  const { exercises, fetchAllExercises , favoriteExercises, fetchFavoriteExercises} = useExercises();

  useEffect(() => {
    fetchAllExercises();
    fetchFavoriteExercises();
  }, []);

  console.log("FavoriteExercises.jsx ", exercises);

  // Filter exercises to include only favorites
  const favorite =  exercises.filter((exercise) => exercise.isFavorite);
  console.log(favoriteExercises);
  return (
    <Box id="exercises" sx={{ mt: { lg: '10px' } }}>
    <Stack direction="row" sx={{ gap: { lg: '10px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        <h2 style={{ textAlign: 'center' }}>Favorite Exercises</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
        {favoriteExercises.length === 0 ? (
          <p>No favorite exercises found.</p>
        ) : (
          favorite.map((exercise) => (
            <li key={exercise.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{exercise.name}</h3>
              <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
              <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
              <p><strong>Equipment:</strong> {exercise.equipment}</p>
              <p><strong>Target:</strong> {exercise.target}</p>
              <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles}</p>
              <p><strong>Instructions:</strong> {exercise.instructions}</p>

            </li>
          ))
        )}
      </ul>
      </Stack>
      </Box>
  );
};

export default FavoriteExercises;