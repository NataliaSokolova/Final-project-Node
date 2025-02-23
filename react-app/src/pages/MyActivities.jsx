import { useState } from "react";
import CreateActivityForm from "../components/app/Activityhook";

const MyActivities = () => {
  const [allActivities] = CreateActivityForm();
  const [showEditJob, setShowEditJob] = useState(false);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>My Activities</h1>

      <div style={{ maxWidth: "800px", margin: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#f4f4f4",
                borderBottom: "2px solid #ddd",
              }}
            >
              <th style={{ padding: "10px", textAlign: "left" }}>
                Activity Name
              </th>
              <th style={{ padding: "10px", textAlign: "left" }}>Type</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Duration</th>
              <th style={{ padding: "10px" }}></th>
            </tr>
          </thead>
          <tbody>{/* Activity rows go here */}</tbody>
        </table>

        <button
          onClick={() => setShowEditJob(true)}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add new Activity
        </button>
      </div>
    </div>
  );
};

export default MyActivities;
