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
                       {/* {exercise.id} */}


                     <h3>  {exercise.name} </h3>  <br />
                        {exercise.bodyPart} <br />
                        {exercise.equipment} <br />
                        {exercise.target} <br />
                        {exercise.secondaryMuscles} <br />
                        {exercise.instructions} <br />
                        {exercise.isFavorite ? 
                       (<button>Remove from favorites</button>) :
                       (<button onClick={() => addToFav(exercise.id)}>Add to favorites</button>)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ExerciseCard;