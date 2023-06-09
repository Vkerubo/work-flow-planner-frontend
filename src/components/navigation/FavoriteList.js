import * as React from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton } from "@mui/material";
import Collapse from "@mui/material/Collapse";
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
        {/* Collapsible header */}
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Favorites" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        {/* Collapsible content */}
        <Collapse in={open} timeout="auto" unmountOnExit>
          {/* Render list items */}
          {list
            ? list.map((item) => {
                return (
                  <List
                    component="div"
                    disablePadding
                    key={`favorite-${item.id}`}
                  >
                    {/* Link to project */}
                    <Link className="link" to={`/projects/${item.id}`} exact>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          {/* Star icon */}
                          <Star />
                        </ListItemIcon>
                        {/* Project title */}
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </Link>
                  </List>
                );
              })
            : null}
        </Collapse>
      </List>
    </div>
  );
};
