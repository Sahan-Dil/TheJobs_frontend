// src/components/UserDashboard.js
import React from "react";
import TaskCoverPage from "../TaskCoverPage";
import img02 from "../../img/ing02.png";

function UserDashboard() {
  const description2 =
    "Schedule an appointment with your consultant. Ask anything to make your abroad dream true.";
  const title2 = "Shedules";
  const imageUrl = "https://source.unsplash.com/random?wallpapers";
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
        imageUrl={img02}
        title={title2}
        description={description2}
        role="user"
      />
    </div>
  );
}

export default UserDashboard;
