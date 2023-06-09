import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { Logo } from "../components/navigation/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

// Login component represents a login page in this app.
const Login = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login authentication logic here
    // For simplicity, we'll check if the username is not empty
    if (userName.trim() !== "") {
      setIsLoggedIn(true);
      setOpenModal(false);
      navigate("/projects"); // Navigate to the projects path
    }
  };

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
            onClick={() => setOpenModal(true)}
            variant="contained"
            size="large"
            className="btn-login"
            color="primary"
          >
            Login
          </Button>
        </Box>
      </Box>

      {/* Login form modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            variant="standard"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin} color="primary">
            Login
          </Button>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Login;
