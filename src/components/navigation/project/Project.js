import * as React from "react";
import { ProjectColors } from "../../../helpers/ProjectColors";
import DropdownMenu from "../DropDownMenu";
import ProjectModal from "../modal/ProjectModal";
import { Link } from "react-router-dom";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

//progress bar for task completion
// The Project component represents a project card
const Project = ({
  project,
  mode, // Represents the mode of the project (e.g., "view", "edit")
  handleUpdatingProject,
  handleDeleteProject,
}) => {
  // handle progress bar
  const tasks = project.boards.map((board) => board.tasks).flat();

  const completedTasks = tasks.filter((task) => task.completed === true);
  const progress =
    completedTasks.length === 0
      ? 0
      : (completedTasks.length / tasks.length) * 100;

  const currentColorScheme = ProjectColors(project); // Determine the color scheme for the project

  //menu to see more options
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(moreAnchorEl);

  const handleMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleFavoringAProject = () => {
    const updatefavProject = { ...project, favorite: !project.favorite };

    handleUpdatingProject(updatefavProject); // Update the project's favorite status
  };

  //handle edit modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModel = () => setOpenModal(true);
  const handleCloseModel = () => setOpenModal(false);

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <Card
        className="b-radius project-card"
        style={{ background: project.color, color: "#444" }}
      >
        <CardActionArea className="card-actions">
          {/* Button to toggle favorite status */}
          <Tooltip
            title={project.favorite ? "Remove Favorite" : "Add Favorite"}
          >
            <IconButton
              onClick={handleFavoringAProject}
              style={{ color: "#444" }}
            >
              {project.favorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>

          {/* Button to show project options */}
          <Tooltip title="Project Options">
            <IconButton
              style={{ color: "#444" }}
              aria-label="show options"
              aria-controls="project-options"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </CardActionArea>
        <CardContent>
          <Link to={`/projects/${project.id}`} className="link">
            <Typography variant="h6" component="p">
              {project.title}
            </Typography>
            {/* Progress bar for task completion */}
            <LinearProgressWithLabel
              value={progress}
              barColor={currentColorScheme.color}
            />
          </Link>
        </CardContent>
      </Card>

      {/* Dropdown menu for more options */}
      <DropdownMenu
        moreAnchorEl={moreAnchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleOpenModel={handleOpenModel}
        handleDelete={handleDeleteProject}
        component={project}
        componentType="Project"
      />

      {/* Modal for editing the project */}
      <ProjectModal
        project={project}
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        handleUpdatingProject={handleUpdatingProject}
        mode={mode}
      />
    </Grid>
  );
};

export default Project;
