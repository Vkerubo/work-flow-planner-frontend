import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { Logo } from "../components/navigation/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Login component represents a login page in this app.
const Login = () => {
  const navigate = useNavigate();

  // Render the Login component
  return (
    <Grid
      sx={{ height: "100vh", width: "100vw", backgroundColor: "#fff" }}
      className="home-container"
      alignContent="center"
      justifyContent="center"
    >
      <Box
        sx={{ height: "100vh", width: "100vw", p: 3 }}
        className="flex column"
      >
        {/* Render the Logo component */}
        <Logo />

        {/* Render the title */}
        <Typography variant="h1" component="h1" align="center">
          Work Flow Planner
        </Typography>

        {/* Render the remaining content */}
        <Box className="flex column">
          <Typography
            component="p"
            align="center"
            className="title-thin padding-bottom"
          >
            Effortlessly organize your projects : Organize your life
          </Typography>
          <Button
            onClick={() => navigate("/projects")}
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
