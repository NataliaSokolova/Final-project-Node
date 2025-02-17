// // import { useState, useMemo } from 'react';



// // const useExercises = () => {

// //     const [allExercises, setExercises] = useState([]);
// //     const [favoriteExercises, setfavoriteExercises] = useState([]);

// //     const fetchExercises = async () => {
// //         try{
// //         const response = await fetch ('/api/v1/exercises');
// //         const data = await response.json();
// //         setExercises(data)
// //         } catch (error) {
// //             console.log("Error", error)
// //         }
// //     };
// //     const fetchFavoriteExercises = async () => {
// //         try{
// //         const response = await fetch ('/api/v1/exercises/all');
// //         const data = await response.json();
// //         setfavoriteExercises(data);
// //         } catch(error) {
// //             console.log("Error", error)
// //         }
// //     }

// //     const exercises = useMemo (() => {
// //        return allExercises.map(exercise => {
// //         return {
// //             ...exercise,
// //             isFavorite: favoriteExercises.some(fav => fav.id === exercise.id),
// //         }
// //        }
// //     )
// //     }, [allExercises, favoriteExercises])


// //     return { exercises,fetchExercises,favoriteExercises, fetchFavoriteExercises }
// // }

// // export default useExercises;



// import { useState, useMemo } from "react";

// const useExercises = () => {
//   const [allExercises, setExercises] = useState([]);
//   const [favoriteExercises, setFavoriteExercises] = useState([]);

  

//   // Функция для загрузки всех упражнений
//   const fetchExercises = async () => {
//     try {
//       const response = await fetch("/api/v1/exercises");
//       console.log("Response:", response);

//       if (!response.ok) {
//         throw new Error("Ошибка при загрузке упражнений");
//       }
//       const data = await response.json();
//       setExercises(data); // Ожидается, что API возвращает массив упражнений
//     } catch (error) {
//       console.log("Ошибка при загрузке упражнений:", error);
//     }
//   };

//   // Функция для загрузки избранных упражнений
//   const fetchFavoriteExercises = async () => {
//     try {
//       const response = await fetch("/api/v1/exercises/all");
//       if (!response.ok) {
//         throw new Error("Ошибка при загрузке избранных упражнений");
//       }
//       const data = await response.json();
//       setFavoriteExercises(data); // Ожидается, что API возвращает массив избранных упражнений
//     } catch (error) {
//       console.log("Ошибка при загрузке избранных упражнений:", error);
//     }
//   };

//   // Добавляем поле `isFavorite` для упражнений, которые есть в избранном
//   const exercises = useMemo(() => {
//     return allExercises.map((exercise) => {
//       return {
//         ...exercise,
//         isFavorite: favoriteExercises.some((fav) => fav.id === exercise.id),
//       };
//     });
//   }, [allExercises, favoriteExercises]);

//   return { exercises, fetchExercises, favoriteExercises, fetchFavoriteExercises };
// };

// export default useExercises;
