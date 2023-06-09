import React from "react";
import TitleField from "./TitleField";
import { SaveButton } from "./SaveButton";
import { Typography, Modal } from "@mui/material";

const BoardModal = ({
  board,
  openModal,
  handleCloseModel,
  handleUpdateBoard,
  handleCreateBoard,
  mode,
}) => {
  // State to manage the name of the board
  const [name, setName] = React.useState(board ? board.name : "");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (board) {
      // If the board exists, update its name
      const updatedBoard = { ...board, name: name };
      handleUpdateBoard(updatedBoard);
    } else {
      // If the board is new, create a new board with the entered name
      const newBoard = { name: name };
      handleCreateBoard(newBoard);
      setName("");
    }

    // Close the modal after submission
    handleCloseModel();
  };

  return (
    <Modal
      className="modal"
      open={openModal}
      onClose={handleCloseModel}
      aria-labelledby="modal-edit-board"
      aria-describedby="modal-edit-board-name"
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
          Board Details
        </Typography>

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="form details-form"
        >
          {/* Component for entering and updating the title */}
          <TitleField title={name} setTitle={setName} labelName="Board Name" />
          {/* Component for saving the board */}
          <SaveButton title={board ? "Save Board" : "Create Board"} />
        </form>
      </div>
    </Modal>
  );
};

export default BoardModal;
