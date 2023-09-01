import React from "react";
import TaskCoverPage from "./admin/TaskCoverPage";

function AdminDashboard() {
  // Define the props to pass to TaskCoverPage
  const imageUrl = "https://source.unsplash.com/random?wallpapers";
  const title1 = "User Management";
  const title2 = "Shedules";

  const description1 =
    "description for User Management..............................................";
  const description2 =
    "description for Shedules ...............................................";

  return (
    <div>
      Admin Dashboard
      <TaskCoverPage
        imageUrl={imageUrl}
        title={title1}
        description={description1}
      />
      <TaskCoverPage
        imageUrl={imageUrl}
        title={title2}
        description={description2}
      />
    </div>
  );
}

export default AdminDashboard;
