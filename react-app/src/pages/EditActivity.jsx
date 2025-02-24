import React from "react";
import CreateActivityForm from "../components/app/Activityhook";

const EditActivities = () => {
  const {
    editActivity,
    allActivities,
    name,
    setName,
    duration,
    setDuration,
    activity,
    setActivity,
    createActivity,
    message,
  } = CreateActivityForm();

  const handleSubmit = (id) => {
    id.preventDefault();
    const newActivity = { name, duration, activity };
    console.log("Submitting:", newActivity);
  };

  return (
    <div>
      {message && (
        <div style={{ color: "green", marginBottom: "10px" }}>{message}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Duration:</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="30 minutes">30 minutes</option>
            <option value="1 hour">1 hour</option>
            <option value="2 hours">2 hours</option>
          </select>
        </div>

        <div>
          <label>Activity:</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="">Select an activity</option>
            <option value="Walking">Walking</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Dance">Dance</option>
            <option value="Swimming">Swimming</option>
            <option value="Football">Football</option>
            <option value="Yoga">Yoga</option>
            <option value="Boxing">Boxing</option>
          </select>
        </div>

        <button type="submit" onClick={() => editActivity()}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditActivities;
