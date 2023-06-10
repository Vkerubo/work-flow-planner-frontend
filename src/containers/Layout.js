import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import TopNav from "../components/navigation/TopNav";
import SideNav from "../components/navigation/SideNav";

const drawerWidth = 240;

//The Layout component is responsible for rendering the overall layout of the application.
const Layout = ({
  children,
  toggleTheme,
  mode,
  projects,
  search,
  setSearch,
  fetchProjects,
}) => {
  // State to manage the open/close state of the side navigation drawer
  const [open, setOpen] = React.useState(false);

  // Function to toggle the side navigation drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Get the current location using the `useLocation` hook from `react-router-dom`
  let location = useLocation();

  return (
    <>
      {/* Conditional rendering based on the current location */}
      {location.pathname === "/" ? (
        // Render only the `children` component when on the home page ("/")
        children
      ) : (
        <>
          {/* Render the top navigation bar */}
          <TopNav
            open={open}
            toggleDrawer={toggleDrawer}
            toggleTheme={toggleTheme}
            mode={mode}
            search={search}
            setSearch={setSearch}
          />
          {/* Render the side navigation drawer */}
          <SideNav
            open={open}
            toggleDrawer={toggleDrawer}
            projects={projects}
            mode={mode}
            fetchProjects={fetchProjects}
          />

          {/* Main content area */}
          <Box
            component="main"
            sx={{
              height: "100vh",
              width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              overflow: "auto",
            }}
          >
            <Toolbar />
            {/* Container for the main content */}
            <Container maxWidth="xl" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className="container-paper" sx={{ height: "800vh" }}>
                    {/* Render the children component */}
                    {children}
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default Layout;
