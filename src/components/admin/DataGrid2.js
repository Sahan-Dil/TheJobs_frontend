import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function DataGridDemo2() {
  const [userList, setUserList] = useState([]); // Initialize userList as an empty array

  const apiUrl = "http://localhost:8080/auth/users";

  useEffect(() => {
    axios
      .get(apiUrl, {
        params: { role: "consultant" },
      })
      .then((response) => {
        // Add a unique 'id' property to each row
        const userDataWithIds = response.data.map((user, index) => ({
          id: index + 1, // Assuming you don't have an 'id' in the API response
          ...user,
        }));
        setUserList(userDataWithIds);
      })
      .catch((error) => {
        console.error("Error fetching user list", error);
      });
  }, []);

  const columns = [
    { field: "userId", headerName: "ID", width: 90 },
    {
      field: "personName",
      headerName: "Fullname",
      width: 150,
      editable: true,
    },
    {
      field: "username",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "90%",
        margin: "auto",
        marginTop: "100px",
      }}
    >
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={userList} // Use userList as the source of data for the DataGrid
          columns={columns}
          getRowId={(row) => row.userId}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </Paper>
  );
}
