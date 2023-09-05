import React from "react";
import TaskCoverPage from "./TaskCoverPage";
import img01 from "../img/img01.png";
import img02 from "../img/ing02.png";
import img03 from "../img/img03.png";

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
      <div
        style={{
          marginTop: "65px",
        }}
      >
        {" "}
      </div>
      <TaskCoverPage
        imageUrl={img01}
        title={title1}
        description={description1}
      />
      <TaskCoverPage
        imageUrl={img02}
        title={title2}
        description={description2}
        role="admin"
      />
      <TaskCoverPage
        imageUrl={img03}
        title={title3}
        description={description3}
        role="admin"
      />
    </div>
  );
}

export default AdminDashboard;
