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
        throw new Error(" Error while loading");
      }
      const data = await response.json();
      setExercises(data.exs);
    } catch (error) {
      console.log("Error while loading:", error);
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

      if (!response.ok) {
        throw new Error("Error while loading");
      }
      const data = await response.json();
      setFavoriteExercises(data.favExs);

    } catch (error) {
      console.log("Error while loading:", error);
    }
  };

  const addToFav = async(exerciseId) => {
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
        throw new Error("Error while loading");
      }

      setFavoriteExercises((prev) => [...prev, exerciseId]);
      
      const data = await response.json();
      console.log("addToFav", data);
    } catch (error) {
      console.log("Error while loading:", error);
    }
  };
 
  const removeFromFav = async (exerciseId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v1/exercise", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ exerciseId }),
      });
      if (!response.ok) {
        throw new Error("Error while deleting");
      }

      setFavoriteExercises((prev) => prev.filter((id) => id !== exerciseId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const exercises = useMemo(() => {
    return allExercises.map((exercise) => {
      return {
        ...exercise,
        isFavorite: favoriteExercises.includes(exercise.id),
      };
    });

  }, [allExercises, favoriteExercises]);

  return { exercises, fetchAllExercises, favoriteExercises, fetchFavoriteExercises, addToFav, removeFromFav};
};

export default useExercises;
