// src/components/UserDashboard.js
import React from "react";
import TaskCoverPage from "./TaskCoverPage";

function UserDashboard() {
  const description2 =
    "description for Shedules ...............................................";
  const title2 = "Shedules";
  const imageUrl = "https://source.unsplash.com/random?wallpapers";
  return (
    <div>
      User Dashboard
      <TaskCoverPage
        imageUrl={imageUrl}
        title={title2}
        description={description2}
        role="user"
      />
    </div>
  );
}

export default UserDashboard;
