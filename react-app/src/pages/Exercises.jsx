import { useState, useMemo } from "react";

const useExercises = () => {
  const [allExercises, setExercises] = useState([]);
  const [favoriteExercises, setFavoriteExercises] = useState([]);

  const fetchAllExercises = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v1/exercise", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при загрузке упражнений");
      }
      const data = await response.json();
      setExercises(data.exs);
    } catch (error) {
      console.log("Ошибка при загрузке упражнений:", error);
    }
  };

  const fetchFavoriteExercises = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v1/exercise/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }, 
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Ошибка при загрузке избранных упражнений");
      }
      const data = await response.json();
      console.log("favEx", data.favExs);
      setFavoriteExercises(data.favExs);

    } catch (error) {
      console.log("Ошибка при загрузке избранных упражнений:", error);
    }
  };

  const addToFav = async(exerciseId) => {
    console.log(exerciseId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v1/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ exerciseId }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Ошибка при загрузке избранных упражнений");
      }
      
      const data = await response.json();
      console.log("addToFav", data);
    } catch (error) {
      console.log("Ошибка при загрузке избранных упражнений:", error);
    }
  };

  console.log("favoriteExercises: ", favoriteExercises);
  // Добавляем поле `isFavorite` для упражнений, которые есть в избранном
  const exercises = useMemo(() => {
    return allExercises.map((exercise) => {
      return {
        ...exercise,
        isFavorite: favoriteExercises.some((fav) => fav.id === exercise.id),
      };
    });

  }, [allExercises, favoriteExercises]);
 
  return { exercises, fetchAllExercises, favoriteExercises, fetchFavoriteExercises, addToFav};
};

export default useExercises;
