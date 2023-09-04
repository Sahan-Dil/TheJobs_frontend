import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate, useLocation } from "react-router-dom";
import WomanIcon from "@mui/icons-material/Woman";
import Man2Icon from "@mui/icons-material/Man2";

function ConsultantList() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const userList = location.state.userList;
  console.log(userList);

  // Extract unique categories from user data
  const allCategories = [...new Set(userList.map((user) => user.category))];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      // Category is already selected, remove it
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      // Category is not selected, add it
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredUserList =
    selectedCategories.length === 0
      ? userList
      : userList.filter((user) => selectedCategories.includes(user.category));

  const handleClick = (user) => {
    if (token) {
      if (user.country) {
        console.log(user);
        navigate("/common/schedules", {
          state: {
            jwtToken: token.token,
            user: user,
          },
        });
      } else {
        alert("Currently not available For Scheduling!");
      }
    } else {
      alert("Please Sign In For Scheduling!");
      navigate("/auth/login");
    }
  };

  function formatAvailability1(availability) {
    try {
      const data = JSON.parse(availability);
      const weekdaysStart = data.weekdaysStart;
      const weekdaysEnd = data.weekdaysEnd;
      const weekendsStart = data.weekendsStart;
      const weekendsEnd = data.weekendsEnd;

      return `Weekdays ${weekdaysStart}:00 - ${weekdaysEnd}:00`;
    } catch (error) {
      console.error("Error parsing availability:", error);
      return "Not available yet";
    }
  }

  function formatAvailability2(availability) {
    try {
      const data = JSON.parse(availability);
      const weekdaysStart = data.weekdaysStart;
      const weekdaysEnd = data.weekdaysEnd;
      const weekendsStart = data.weekendsStart;
      const weekendsEnd = data.weekendsEnd;

      return `Weekends ${weekendsStart}:00 - ${weekendsEnd}:00`;
    } catch (error) {
      console.error("Error parsing availability:", error);
      return "Not available yet";
    }
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: window.innerWidth >= 600 ? 100 : 80, // 64 for medium screens, 8 for mobile devices
        }}
      >
        <div
          style={{
            width: "50%",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {/* Category filter checkboxes */}
          <FormControl component="fieldset">
            <FormGroup>
              {allCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                  }
                  label={category ? category : "Not categorized yet"}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </div>

      <Grid container spacing={2}>
        {filteredUserList.map((user) => (
          <Grid item key={user.userId} xs={12} sm={6} md={4}>
            <Card
              sx={{ maxWidth: 345, margin: 2 }}
              md={{ maxWidth: 345, margin: 2 }}
            >
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
                  fontSize: "1.8rem", // Font size for screens >= sm
                  "@media (max-width:600px)": {
                    fontSize: "1.2rem", // Font size for xs screens
                  },
                }}
                action={
                  user.gender === "female" ? (
                    <WomanIcon fontSize="large" />
                  ) : (
                    <Man2Icon fontSize="large" />
                  )
                }
                subheaderTypographyProps={{
                  align: "center",
                  fontSize: "1.1rem", // Font size for screens >= sm
                  "@media (max-width:600px)": {
                    fontSize: "0.9rem",
                  },
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
                        sm: "2rem", // Font size for screens >= sm (inherit from parent)
                      },
                    }}
                  >
                    {user.country}
                  </Typography>
                </Box>

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
                        xs: "0.6rem", // Font size for xs screens
                        sm: "0.9rem", // Font size for screens >= sm (inherit from parent)
                      },
                    }}
                  >
                    {user.description}
                  </Typography>
                </Box>

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
                        xs: "0.8rem", // Font size for xs screens
                        sm: "1rem", // Font size for screens >= sm (inherit from parent)
                      },
                    }}
                  >
                    {formatAvailability1(user.availability)}
                  </Typography>
                </Box>
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
                        xs: "0.8rem", // Font size for xs screens
                        sm: "1rem", // Font size for screens >= sm (inherit from parent)
                      },
                    }}
                  >
                    {formatAvailability2(user.availability)}
                  </Typography>
                </Box>
              </CardContent>
              {token && (
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleClick(user)}
                  >
                    Go to scedule
                  </Button>
                </CardActions>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ConsultantList;
