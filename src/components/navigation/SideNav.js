import * as React from "react";
import "../../css/sidenav.css";
import { Projectlist } from "./Projectlist";
import { FavoriteList } from "./FavoriteList";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import {
  Typography,
  Toolbar,
  Divider,
} from "@mui/material/styles/createTypography";
import Drawer from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// Navigation component renders the toolbar, favorite list, and project list
const Navigation = ({ projects, favorites, mode, fetchProjects }) => {
  let navigate = useNavigate();

  // Handle click on the home button, navigate to "/projects" and fetch projects
  const handleHomeClick = (event) => {
    navigate.push("/projects");
    fetchProjects();
  };

  return (
    <>
      {/* Toolbar */}
      <Toolbar className="flex">
        <a onClick={handleHomeClick} href="#" className="flex link">
          <Logo />
          <Typography
            className="letter-spacing"
            component="h1"
            variant="h6"
            noWrap
            sx={{ color: mode ? "#444" : "#fff" }}
            align="center"
          >
            Work Flow
          </Typography>
        </a>
      </Toolbar>

      {/* Favorite List */}
      <FavoriteList list={favorites} />

      {/* Divider */}
      <Divider sx={{ display: { sm: "none" } }} />

      {/* Project List */}
      <Projectlist list={projects} />
    </>
  );
};

// SideNav component renders the mobile and desktop drawers
const SideNav = ({
  open,
  toggleDrawer,
  window,
  projects,
  mode,
  fetchProjects,
}) => {
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // Filter projects to get the favorites
  const favorites = projects
    ? projects.filter((project) => project.favorite === true)
    : [];

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        container={container}
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {/* Render Navigation component inside the mobile drawer */}
        <Navigation
          projects={projects}
          favorites={favorites}
          mode={mode}
          fetchProjects={fetchProjects}
        />
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            border: "none",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.background.default
                : theme.palette.grey[900],
          },
        }}
        open
      >
        {/* Render Navigation component inside the desktop drawer */}
        <Navigation
          projects={projects}
          favorites={favorites}
          mode={mode}
          fetchProjects={fetchProjects}
        />
      </Drawer>
    </>
  );
};

export default SideNav;
