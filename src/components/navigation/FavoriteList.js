import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material";
import ListItemText from "@mui/material";
import { ListItemButton } from "@mui/material";
import Collapse from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { Star } from "@mui/icons-material";

export const FavoriteList = ({ list }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List>
        <ListItemButton onClick={handleClick}></ListItemButton>
      </List>
    </div>
  );
};
