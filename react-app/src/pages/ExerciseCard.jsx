import React, { useEffect } from 'react';
import useExercises from './Exercises';

const ExerciseCard = () => {
    const { exercises, fetchAllExercises, fetchFavoriteExercises, addToFav} = useExercises();

    useEffect(() => {
        fetchAllExercises();
        fetchFavoriteExercises();
    }, []);

    return(
        <div>
            <h2>Exercises</h2>
            <ul>
                {exercises.map(exercise => (
                    <li key={exercise.id}>
                       {exercise.id} {exercise.name} {exercise.isFavorite ? 
                       (<button>Remove from favorites</button>) :
                       (<button onClick={() => addToFav(exercise.id)}>Add to favorites</button>)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExerciseCard;