import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Full_Name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "Phone",
    headerName: "Phone",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    Full_Name: "Sahan Dilshan",
    Email: "sahan@example.com",
    Phone: "0783867799",
  },
  {
    id: 2,
    Full_Name: "sarala lshan",
    Email: "sahan2@example.com",
    Phone: "078567748",
  },
  {
    id: 3,
    Full_Name: "Sah Dil",
    Email: "sahan34@example.com",
    Phone: "0755677995",
  },
];

export default function DataGridDemo() {
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
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </Paper>
  );
}
