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
        // Show success message
        setMessage("Activity added successfully!");

        // Reset form fields after submission
        setName("");
        setDuration("30 minutes");
        setActivity("");

        // Hide message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.log("Error while loading:", error);
    }
  }

//   const editActivity = async () => {
//   }

//   const deleteActivity = async () => {
//   }


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
        createActivity,
        allActivities,
        name, setName,
        duration, setDuration,
        activity, setActivity,
        message,
        };
}


export default CreateActivityForm;