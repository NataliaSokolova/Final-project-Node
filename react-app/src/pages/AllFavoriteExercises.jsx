import React, { useEffect } from 'react';
import useExercises from './Exercises';



const AllFavoriteExercises = () => {
    const { favoriteExercises, fetchFavoriteExercises} = useExercises();
  return (
    <div>
      FavoriteExercises 
    </div>
  )
}

export default AllFavoriteExercises
