import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { Logo } from "../components/navigation/Logo";

//Login component represents a login page in this app.
const Login = ({ history }) => {
  // Render the Login component
  return (
    <Grid
      // Set styling for the main grid container
      sx={{ height: "100vh", width: "100vw", backgroundColor: "#fff" }}
      className="home-container"
      alignContent="center"
      justifyContent="center"
    >
      <Box
        // Set styling for the inner box container
        sx={{ height: "100vh", width: "100vw", p: 3 }}
        className="flex column"
      >
        <Box className="flex">
          {/* Render the Logo component */}
          <Logo />
          {/* Render the page title */}
          <Typography variant="h1" component="h1">
            Work Flow Planner
          </Typography>
        </Box>
        <Box className="flex column">
          {/* Render the subtitle */}
          <Typography component="h2" variant="h6" align="center">
            Worry about your <em>job</em> not your <em>time</em>.
          </Typography>
          {/* Render the description */}
          <Typography
            component="p"
            align="center"
            className="title-thin padding-bottom"
          >
            A project management tool to help you keep your life organized.
          </Typography>
          {/* Render the login button */}
          <Button
            // Navigate to "/projects" when the button is clicked
            onClick={() => history.push("/projects")}
            variant="contained"
            size="large"
            className="btn-login"
            color="primary"
          >
            Login
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default Login;
