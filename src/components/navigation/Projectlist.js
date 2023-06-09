import React from "react";
import { List } from "@mui/material";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemIcon";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Dashboard } from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import { ProjectColors } from "../../helpers/ProjectColors";
import ExpandLess from "@mui/icons-material/ExpandLess";
import { ExpandMore } from "@mui/icons-material";
import { StarBorder } from "@mui/icons-material";

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

          {list
            ? list.map((item) => {
                const currentColorScheme = ProjectColors(item);
                return (
                  <List
                    component="div"
                    disablePadding
                    key={`menuitem-${item.id}`}
                  >
                    {/* Link to individual project */}
                    <Link className="link" to={`/projects/${item.id}`} exact>
                      {/* Project item */}
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          {/* Icon for project */}
                          <Dashboard
                            style={{ color: currentColorScheme.colorDark }}
                          />
                        </ListItemIcon>
                        {/* Title of project */}
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </Link>
                  </List>
                );
              })
            : null}
        </Collapse>
      </List>
    </>
  );
};
