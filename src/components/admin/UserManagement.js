import React, { useState } from "react";
import DataGrid from "./DataGrid";
import UserRegForm from "./UserRegForm";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";

function UserManagement() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isAccordionOpen2, setIsAccordionOpen2] = useState(false);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };
  const toggleAccordion2 = () => {
    setIsAccordionOpen2(!isAccordionOpen2);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack accordions vertically
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box width={"90%"} marginTop={"10%"}>
        <Accordion
          expanded={isAccordionOpen}
          onChange={toggleAccordion}
          sx={{ maxWidth: "100%" }} // Restrict the width
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="user-management-content"
            id="user-management-header"
          >
            <Typography variant="h6">Job Seeker Management</Typography>
          </AccordionSummary>
          <div style={{ padding: isSmallScreen ? "16px" : "50px" }}>
            <UserRegForm />
            <DataGrid />
          </div>
        </Accordion>
      </Box>
      <Box width={"90%"} marginTop={"1%"}>
        <Accordion
          expanded={isAccordionOpen2}
          onChange={toggleAccordion2}
          sx={{ maxWidth: "100%" }} // Restrict the width
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="user-management-content"
            id="user-management-header"
          >
            <Typography variant="h6">Job Seeker Management</Typography>
          </AccordionSummary>
          <div style={{ padding: isSmallScreen ? "16px" : "50px" }}>
            <UserRegForm />
            <DataGrid />
          </div>
        </Accordion>
      </Box>
    </div>
  );
}

export default UserManagement;
