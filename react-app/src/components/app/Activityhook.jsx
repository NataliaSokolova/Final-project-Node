import { useState } from "react";


const CreateActivityForm = () => {
  const [allActivities, setAllActivities] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("10 minutes");
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState(""); 

  // Fetching all activites from the backend and DB
  const fetchAllActivities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/v1/exercise/activity", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(" Error while loading");
      }
      const respJson = await response.json();
      setAllActivities(respJson.data);
    } catch (error) {
      console.log("Error while loading:", error);
    }
  };

  const createActivity = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/v1/exercise/activity", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name, activity: activity, duration: duration })
        });

        if (!response.ok) {
            throw new Error("Error while posting activity to backend");
        }
        setMessage("Activity added successfully!");
        setName("");
        setDuration("30 minutes");
        setActivity("");
        setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log("Error while loading:", error);
    }
  }

  const editActivity = async (activityId) => {
    try {
      if (!activityId) {
        console.error("No activity ID provided for editing");
        return;
      }
      const token = localStorage.getItem("token");
        if (!name || !duration || !activity) {
        console.error("All fields must be filled before updating activity");
        setMessage("Please fill all fields before updating.");
     
      }
        const response = await fetch(`/api/v1/exercise/activity/${activityId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, duration, activity })
        });

        if (!response.ok) {
            throw new Error("Error while posting activity update to backend");
        }
    } catch (error) {
      console.log("Error while loading:", error);
    }
  }

  const deleteActivity = async (activityId) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/v1/exercise/activity/${activityId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Error while deleting activity from backend");
        }
        setAllActivities((prev) => prev.filter((activity) => activity._id !== activityId));
        setMessage("Activity deleted successfully!");
        setTimeout(() => setMessage(""), 3000);

        // Optionally, you can refetch or update the activities list after deletion
        // fetchActivities(); // Assuming you have a function to fetch activities

    } catch (error) {
        console.log("Error while deleting activity:", error);
    }
};


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const activityData = {
//       name,
//       duration,
//       activities,
//     };

//     try {
//       const createdActivity = await createActivity(activityData);
//       console.log("Activity created:", createdActivity);
//       setName("");
//       setDuration("");
//       setActivities("");
//     } catch (error) {
//       console.error("Failed to create activity:", error);
//     }
//   };


    return {
        fetchAllActivities,
        editActivity,
        createActivity,
        allActivities,
        name, setName,
        duration, setDuration,
        activity, setActivity,
        message,
        deleteActivity
        };
}


export default CreateActivityForm;