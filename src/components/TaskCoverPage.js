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
import ConsultantList from "./user/ConsultantList";

const TaskCoverPage = ({ imageUrl, title, description, role }) => {
  const navigate = useNavigate();
  let token = JSON.parse(localStorage.getItem("token")); // Retrieve the token from local storage
  const [consultantList, setConsultantList] = useState([]);
  const [consultantUser, setConsultantUser] = useState([]);

  useEffect(() => {
    if (role === "consultant") {
      loadConsultantData();
    } else {
      loadData();
    }
  }, []);

  const loadConsultantData = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const consultantApiUrl = `http://localhost:8080/auth/getConsultancy/${token.userId}`;

    await axios
      .get(consultantApiUrl)
      .then((consultantResponse) => {
        setConsultantUser(consultantResponse.data);
        console.log("consultantResponse.data", consultantResponse.data);
        console.log("consultantUser.data", consultantUser);
      })
      .catch((error) => {
        console.error(
          `Error fetching consultant data for user ${token.userId},because ${error}`
        );
      });
  };

  const loadData = async () => {
    const apiUrl = "http://localhost:8080/auth/users";

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

  const handleGoButtonClick = () => {
    if (title === "User Management") {
      navigate("/admin/usermanagement", {
        state: {
          jwtToken: token.token,
        },
      });
    } else if (title === "Shedules") {
      if (role === "consultant") {
        console.log("consultantUser.........", consultantUser);
        if (consultantUser.country) {
          navigate("/consultant/schedules", {
            state: {
              jwtToken: token.token,
              user: consultantUser,
            },
          });
        } else {
          alert("You need to set up user consultant details first...");
        }
      } else if (role === "admin") {
        if (consultantList[0]) {
          console.log("consultantList", consultantList);
          navigate("/common/consultantList", {
            state: {
              jwtToken: token.token,
              userList: consultantList,
            },
          });
        } else alert("something went wrong!!!");
      } else if (role === "user") {
        if (consultantList[0]) {
          console.log("consultantList", consultantList);
          navigate("/common/consultantList", {
            state: {
              jwtToken: token.token,
              userList: consultantList,
            },
          });
        } else alert("something went wrong!!!");
      }
    } else if (title === "Reports Dashboard") {
      if (consultantList[0]) {
        console.log("consultantList", consultantList);
        navigate("/admin/reports", {
          state: {
            jwtToken: token.token,
            userList: consultantList,
          },
        });
      } else alert("Reports not available !!");
    }
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          height: "80vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {/* Left side - Image */}
          <Grid item xs={12} md={6} lg={8}>
            <img
              src={imageUrl} // Use the imageUrl prop here
              alt="Consultancy Image"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Grid>

          {/* Right side - Card */}
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card sx={{ height: "auto", borderRadius: "200px", maxWidth: 345 }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "100%",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {title} {/* Use the title prop here */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description} {/* Use the description prop here */}
                </Typography>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button size="small" onClick={handleGoButtonClick}>
                    GO
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TaskCoverPage;
