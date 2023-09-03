import React from "react";
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
  console.log(token);

  const handleClick = (user) => {
    if (token) {
      console.log(user);
      navigate("/user/schedules", {
        state: {
          jwtToken: location.state.jwtToken,
          user: user,
        },
      });
    } else {
      alert("Please Sign In For Scheduling!");
      navigate("/auth/login");
    }
  };

  return (
    <div>
      <Grid container spacing={2}>
        {userList.map((user) => (
          <Grid item key={user.userId} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: 2 }}>
              <CardHeader
                title={user.personName}
                subheader={`Phone: ${user.phone}`}
                titleTypographyProps={{ align: "center" }}
                action={
                  user.gender === "Female" ? (
                    <WomanIcon fontSize="large" />
                  ) : (
                    <Man2Icon fontSize="large" />
                  )
                }
                subheaderTypographyProps={{
                  align: "center",
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
                  <Typography component="h2" variant="h3" color="text.primary">
                    {user.country}
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
