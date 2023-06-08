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
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

// Navigation component renders the toolbar, favorite list, and project list
const Navigation = ({ projects, favorites, mode, fetchProjects }) => {
  let history = useHistory();

  // Handle click on the home button, navigate to "/projects" and fetch projects
  const handleHomeClick = (event) => {
    history.push("/projects");
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
            Mercury
          </Typography>
        </a>
      </Toolbar>


  );
};

export default SideNav;
