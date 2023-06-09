import * as React from "react";

import TitleField from "./TitleField";
import ColorPicker from "./ColorPicker";
import { SaveButton } from "./SaveButton";
import { Typography, Modal } from "@mui/material";
import "./modal.css";
import { palette } from "../../../theme/palette";

const ProjectModal = ({
  openModal,
  handleCloseModel,
  mode,
  project,
  postProjects,
  handleUpdatingProject,
}) => {
  // State to manage the title and color of the project
  const [title, setTitle] = React.useState(project ? project.title : "");
  const [color, setColor] = React.useState(project ? project.color : "");

  // Update the state when the project prop changes
  React.useEffect(() => {
    setTitle(project ? project.title : "");
    setColor(project ? project.color : "");
  }, [project]);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (project) {
      // If the project exists, update its title and color
      const updatedProject = { ...project, title: title, color: color };
      handleUpdatingProject(updatedProject);
    } else {
      // If the project is new, create a new project with the entered title and color
      const newProject = { title: title, color: color };
      postProjects(newProject);
      setTitle("");
      setColor("");
    }

    // Close the modal after submission
    handleCloseModel();
  };

  return (
    <Modal
      className="modal"
      open={openModal}
      onClose={handleCloseModel}
      aria-labelledby="modal-edit-project"
      aria-describedby="modal-edit-project-name-color"
    >
      <div
        className="modal-body edit-modal b-radius"
        style={{ background: !mode ? "#212121" : "#fff" }}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h3"
          gutterBottom
        >
          Project Details
        </Typography>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="form details-form"
        >
          {/* Component for entering and updating the project title */}
          <TitleField
            title={title}
            setTitle={setTitle}
            labelName="Project Title"
          />

          {/* Component for selecting the project color */}
          <ColorPicker colors={palette} color={color} setColor={setColor} />

          {/* Component for saving the project */}
          <SaveButton title={project ? "Save Project" : "Create Project"} />
        </form>
      </div>
    </Modal>
  );
};

export default ProjectModal;
