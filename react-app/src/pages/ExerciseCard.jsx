import React, { useEffect, useState } from 'react';
import useExercises from './Exercises';

const ExerciseCard = () => {
    const { exercises, fetchAllExercises, fetchFavoriteExercises, addToFav, removeFromFav} = useExercises();
    const [currentPage, setCurrentPage] = useState(1); 
    const exercisesPerPage = 5; 

    useEffect(() => {
        fetchAllExercises();
        fetchFavoriteExercises();
    }, []);

    // fetchAllExercises, fetchFavoriteExercises

    // Calculate the exercises to display for the current page
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers to display
    const pageNumbers = [];
    const totalPages = Math.ceil(exercises.length / exercisesPerPage);
    const maxPageButtons = 5; // Maximum number of page buttons to display

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Exercises</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {currentExercises.map((exercise) => (
                    <li key={exercise.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <h3 style={{ margin: '0 0 10px 0' }}>{exercise.name}</h3>
                        <p><strong>Body Part:</strong> {exercise.bodyPart}</p>
                        <p><strong>Equipment:</strong> {exercise.equipment}</p>
                        <p><strong>Target:</strong> {exercise.target}</p>
                        <p><strong>Secondary Muscles:</strong> {exercise.secondaryMuscles}</p>
                        <p><strong>Instructions:</strong> {exercise.instructions}</p>
                        {exercise.isFavorite ? (
                            <button
                                onClick={() => removeFromFav(exercise.id)}
                                style={{ backgroundColor: '#ffcccc', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Remove from favorites
                            </button>
                        ) : (
                            <button 
                                onClick={() => addToFav(exercise.id)} 
                                style={{ backgroundColor: '#ccffcc', padding: '5px 10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Add to favorites
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                    style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    First
                </button>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Previous
                </button>
                {pageNumbers.map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        style={{
                            margin: '0 5px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            fontWeight: currentPage === number ? 'bold' : 'normal',
                            backgroundColor: currentPage === number ? '#007bff' : '#fff',
                            color: currentPage === number ? '#fff' : '#000',
                            border: '1px solid #007bff',
                            borderRadius: '5px',
                        }}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Next
                </button>
                <button
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                    style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default ExerciseCard;