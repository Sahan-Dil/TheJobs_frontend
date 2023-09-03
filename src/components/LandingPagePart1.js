import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import CardHeader from "@mui/material/CardHeader";
import WomanIcon from "@mui/icons-material/Woman";
import Man2Icon from "@mui/icons-material/Man2";
import ConsultantList from "./user/ConsultantList";

const LandingPagePart1 = () => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("token")); // Retrieve the token from local storage
  const [consultantList, setConsultantList] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const apiUrl = "http://localhost:8080/auth/users";
    const token = { token: "yourAuthToken" }; // Replace with your actual token

    // Step 1: Fetch the user list
    await axios
      .get(apiUrl, {
        params: { role: "consultant" },
      })
      .then((response) => {
        console.log("response", response);
        const userList = response.data;

        // Step 2: Map over the user list and fetch consultant data for each user
        const fetchConsultantData = userList.map((user) => {
          const userId = user.userId;
          const consultantApiUrl = `http://localhost:8080/auth/getConsultancy/${userId}`;

          console.log("consultantApiUrl", consultantApiUrl);

          return axios
            .get(consultantApiUrl)
            .then((consultantResponse) => {
              return {
                userId: userId,
                ...consultantResponse.data,
              };
            })
            .catch((error) => {
              console.error(
                `Error fetching consultant data for user ${userId},because ${error}`
              );
              return {
                userId: userId,
                availability: "N/A", // Handle error case appropriately
              };
            });
        });

        // Step 3: Wait for all consultant data requests to complete
        Promise.all(fetchConsultantData)
          .then((consultantDataArray) => {
            // Step 4: Combine user data and consultant data
            const combinedData = userList.map((user) => {
              const consultantData = consultantDataArray.find(
                (data) => data.userId === user.userId
              );
              return {
                ...user,
                ...consultantData,
              };
            });

            // Step 5: Set the combined data in state
            setConsultantList(combinedData);
          })
          .catch((error) => {
            console.error(
              "Error fetching consultant data for some users",
              error
            );
            // Handle the error appropriately
          });
      })
      .catch((error) => {
        console.error("Error fetching user list", error);
        // Handle the error appropriately
      });
  };

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Our Consultant Team
      </h1>

      <Grid container spacing={2}>
        {consultantList.map((user) => (
          <Grid item key={user.userId} xs={6} sm={6} md={3}>
            <Card sx={{ maxWidth: 345, height: 200, margin: 2 }}>
              <CardHeader
                title={user.personName}
                subheader={
                  <>
                    <div>{user.phone}</div>
                    <div>{user.email}</div>{" "}
                  </>
                }
                titleTypographyProps={{
                  align: "center",
                  fontSize: "1.5rem", // Font size for screens >= sm
                  "@media (max-width:600px)": {
                    fontSize: "1rem", // Font size for xs screens
                  },
                }}
                action={
                  user.gender === "Female" ? (
                    <WomanIcon fontSize="large" />
                  ) : (
                    <Man2Icon fontSize="large" />
                  )
                }
                subheaderTypographyProps={{
                  align: "center",
                  fontSize: "1rem", // Font size for screens >= xs
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography
                    component="h2"
                    variant="h3"
                    color="text.primary"
                    sx={{
                      fontSize: {
                        xs: "1.5rem", // Font size for xs screens
                        sm: "inherit", // Font size for screens >= sm (inherit from parent)
                      },
                    }}
                  >
                    {user.country}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LandingPagePart1;
