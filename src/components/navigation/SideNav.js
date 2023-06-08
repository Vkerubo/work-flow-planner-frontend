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
};

export default SideNav;
