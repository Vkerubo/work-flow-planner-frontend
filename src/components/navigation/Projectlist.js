import React from "react";
import { List } from "@mui/material";
import ListItemButton from "@mui/material";
import ListItemText from "@mui/material";

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
        </ListItemButton>
      </List>
    </>
  );
};
