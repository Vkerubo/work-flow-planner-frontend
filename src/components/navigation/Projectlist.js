import React from "react";
import { List } from "@mui/material";
import ListItemButton from "@mui/material";
import ListItemText from "@mui/material";
import ListItemIcon from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import Collapse from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";

export const Projectlist = ({ list }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List>
        {/* Collapsible section header */}
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Projects" />
          {/* Show different icon based on open/closed state */}
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Collapsible section body */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          {/* Render project items */}
        </Collapse>
      </List>
    </>
  );
};
