import React, { useEffect, useState } from 'react';
import useExercises from './Exercises';
import { Stack, Box, Select, MenuItem } from '@mui/material';

const ExerciseCard = () => {
    const { exercises, fetchAllExercises, fetchFavoriteExercises, addToFav, removeFromFav} = useExercises();
    const [currentPage, setCurrentPage] = useState(1); 
    const [filterCriteria, setFilterCriteria] = useState('all'); 
    const exercisesPerPage = 5; 

    useEffect(() => {
        fetchAllExercises();
        fetchFavoriteExercises();
    }, []);


    const filterExercises = () => {
        console.log("filterExercises", exercises.length);
        if (!exercises || exercises.length === 0) return [];
        console.log("filter criteria", filterCriteria);
        if (filterCriteria === 'all') {console.log("returning exercises"); return exercises;}
        return exercises.filter((exercise) => 
            exercise.bodyPart.toLowerCase() === filterCriteria.toLowerCase()
        );
    };

    console.log("before exercises lenght", exercises.length);
    const filteredExercises = filterExercises();
    console.log("filtered exercises lenght", filteredExercises.length)

    // Calculate the exercises to display for the current page
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = filteredExercises.slice(indexOfFirstExercise, indexOfLastExercise);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Generate page numbers to display
    const pageNumbers = [];
    const totalPages = Math.ceil(filteredExercises.length / exercisesPerPage);
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
        <Box id="exercises" sx={{ mt: { lg: '10px' } }}>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Select
                    value={filterCriteria}
                    onChange={(e) => { setFilterCriteria(e.target.value); setCurrentPage(1); }} // Reset page on filter change
                    displayEmpty
                    sx={{ width: 200 }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="back">Back</MenuItem>
                    <MenuItem value="cardio">Cardio</MenuItem>
                    <MenuItem value="chest">Chest</MenuItem>
                    <MenuItem value="lower arms">Lower Arm</MenuItem>
                    <MenuItem value="lower legs">Lower Legs</MenuItem>
                    <MenuItem value="neck">Neck</MenuItem>
                    <MenuItem value="shoulders">Shoulders</MenuItem>
                    <MenuItem value="upper arms">Upper Arms</MenuItem>
                    <MenuItem value="upper legs">Upper Legs</MenuItem>
                    <MenuItem value="waist">Waist</MenuItem>
                </Select>
            </Box> 


        <Stack direction="row" sx={{ gap: { lg: '10px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
            <h2 style={{ textAlign: 'center' }}>Exercises</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {currentExercises.map((exercise) => (
                    <li key={exercise.id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                        <h2 style={{ margin: '0 0 10px 0' }}>{exercise.name}</h2>
                        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
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
            <div style={{ marginTop: '20px', textAlign: 'center'}}>
                <button
                    onClick={() => paginate(1)}
                    disabled={currentPage === 1}
                    style={{ backgroundColor: '#EBE6E7',borderRadius: '5px', margin: '0 5px',border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                >
                    First
                </button>
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ backgroundColor: '#EBE6E7',borderRadius: '5px',  margin: '0 5px',border: 'none', padding: '5px 10px', cursor: 'pointer' }}
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
                            backgroundColor: currentPage === number ? '#EBE6E7' : '#fff',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        {number}
                    </button>
                ))}
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ backgroundColor: '#EBE6E7',borderRadius: '5px',  border: 'none', margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Next
                </button>
                <button
                    onClick={() => paginate(totalPages)}
                    disabled={currentPage === totalPages}
                    style={{ backgroundColor: '#EBE6E7',borderRadius: '5px',  border: 'none', margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
                >
                    Last
                </button>
            </div>
        </Stack>
        </Box>
    );
};

export default ExerciseCard;