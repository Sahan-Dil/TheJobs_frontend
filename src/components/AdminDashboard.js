import React from "react";
import TaskCoverPage from "./TaskCoverPage";

function AdminDashboard() {
  // Define the props to pass to TaskCoverPage
  const imageUrl = "https://source.unsplash.com/random?wallpapers";
  const title1 = "User Management";
  const title2 = "Shedules";
  const title3 = "Reports Dashboard";

  const description1 =
    "description for User Management..............................................";
  const description2 =
    "description for Shedules ...............................................";
  const description3 =
    "description for Reports dashboard ...............................................";

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
        role="admin"
      />
      <TaskCoverPage
        imageUrl={imageUrl}
        title={title3}
        description={description3}
        role="admin"
      />
    </div>
  );
}

export default AdminDashboard;
