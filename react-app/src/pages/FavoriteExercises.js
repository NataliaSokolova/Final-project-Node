// import React, { useEffect } from 'react';
// import useExercises from './Exercises';

// const FavoriteExercises = () => {
//   const { favoriteExercises, fetchFavoriteExercises, exercises } = useExercises();

//   useEffect(() => {
//     fetchFavoriteExercises();
//   }, [fetchFavoriteExercises]);

//   return (
//     <div>
//       <h2>Favorite Exercises</h2>
//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//       {exercise.isFavorite ? (
//         {exercise.map((fav) => (
//           <li key={fav.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
//             <h3 style={{ margin: '0 0 10px 0' }}>{exercise.name}</h3>
//             <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
//             <p><strong>Equipment:</strong> {exercise.equipment}</p>
//             <p><strong>Target:</strong> {exercise.target}</p>
//             <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles}</p>
//             <p><strong>Instructions:</strong> {exercise.instructions}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavoriteExercises;



import React, { useEffect } from 'react';
import useExercises from './Exercises';

const FavoriteExercises = () => {
  const { exercises, fetchFavoriteExercises } = useExercises();

  useEffect(() => {
    fetchFavoriteExercises();
  }, [fetchFavoriteExercises]);

  return (
    <div>
      <h2>Favorite Exercises</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {exercises.map((exercise) =>
          exercise.isFavorite ? (
            <li key={exercise.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{exercise.name}</h3>
              <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
              <p><strong>Equipment:</strong> {exercise.equipment}</p>
              <p><strong>Target:</strong> {exercise.target}</p>
              <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles}</p>
              <p><strong>Instructions:</strong> {exercise.instructions}</p>
            </li>
          ) : null // Return null for non-favorite exercises
        )}
      </ul>
      {exercises.filter((exercise) => exercise.isFavorite).length === 0 && (
        <p>No favorite exercises found.</p>
      )}
    </div>
  );
};

export default FavoriteExercises;