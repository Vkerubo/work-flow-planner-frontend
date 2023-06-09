import * as React from "react";
import { Typography, Grid, IconButton, Tooltip, Box } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Skeleton from "@mui/material/Skeleton";
import Project from "../components/navigation/project/Project";
import ProjectModal from "../components/navigation/modal/ProjectModal";

//This Projects component is responsible for rendering a list of projects.
const Projects = ({
  projects,
  mode,
  postProjects,
  handleUpdatingProject,
  handleDeleteProject,
}) => {
  //handle edit project modal
  const [openModal, setOpenModal] = React.useState(false);

  // Function to open the project creation modal
  const handleOpenModel = () => setOpenModal(true);
  const handleCloseModel = () => setOpenModal(false);

  return (
    <>
      {/* Heading and create new project button */}
      <Grid container alignContent="center" justifyContent="space-between">
        <Typography variant="h2" gutterBottom>
          Projects
        </Typography>
        <Box className="flex">
          {/* Tooltip and button to create a new project */}
          <Tooltip title="Create New Project">
            <IconButton
              size="large"
              aria-label="create project"
              color="inherit"
              onClick={handleOpenModel}
            >
              <ControlPointIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
      </Grid>
      {/* Projects grid */}
      <Grid container spacing={2}>
        {/* Check if there are projects */}
        {projects.length !== 0
          ? projects.map((project) => (
              // Render project cards
              <Project
                mode={mode}
                project={project}
                key={`projectcard-${project.id}`}
                handleUpdatingProject={handleUpdatingProject}
                handleDeleteProject={handleDeleteProject}
              />
            ))
          : [1, 2, 3].map((load) => {
              return (
                <Grid item xs={12} sm={12} md={6} lg={4} key={`load-${load}`}>
                  {/* Skeleton loader for project card */}
                  <Skeleton />
                  <Skeleton
                    sx={{ height: 100 }}
                    animation="wave"
                    variant="rectangular"
                  />
                </Grid>
              );
            })}

        {/* create new project modal */}
        <ProjectModal
          project={null}
          openModal={openModal}
          handleCloseModel={handleCloseModel}
          postProjects={postProjects}
          mode={mode}
        />
      </Grid>
    </>
  );
};

export default Projects;
