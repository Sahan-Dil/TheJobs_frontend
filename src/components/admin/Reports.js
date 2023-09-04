import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Reports() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const userList = location.state.userList;
  console.log("token", token);
  console.log("userList", userList);

  return <div>reports Dashboard</div>;
}

export default Reports;
