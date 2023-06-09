import * as React from "react";
import "../css/boards.css";
import { Container, Grid } from "@mui/material";
import Board from "../components/navigation/board/Board";
import BoardModal from "../components/navigation/modal/BoardModal";
import CreateBoard from "../components/navigation/board/CreateBoard";

// render Board components
const Boards = ({
  boards,
  projectId,
  mode,
  setBoards,
  fetchProject,
  colors,
}) => {
  // Handle deleting a board
  const handleDeleteBoard = (deleteBoard) => {
    // Filter out the deleted board from the boards array
    const updatedBoards = boards.filter((board) => board.id !== deleteBoard.id);

    // Send a DELETE request to the API to delete the board
    fetch(`http://localhost:9292/boards/${deleteBoard.id}`, {
      method: "DELETE",
    });

    // Update the boards state with the updated array
    setBoards(updatedBoards);
  };

  // Handle updating a board
  const handleUpdateBoard = (updatedBoard) => {
    // Map over the boards array and replace the updated board with the same id
    const updatedBoards = boards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    // Send a PATCH request to the API to update the board
    fetch(`http://localhost:9292/boards/${updatedBoard.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: updatedBoard.name,
      }),
    });

    // Update the boards state with the updated array
    setBoards(updatedBoards);
  };

  // Handle creating a new board
  const handleCreateBoard = (newBoard) => {
    // Send a POST request to the API to create a new board
    fetch("http://localhost:9292/boards/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: newBoard.name,
        project_id: projectId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (boards.length === 0) {
          // If there are no existing boards, set the new board as the only board
          setBoards([data]);
        } else {
          // Add the new board to the existing boards
          setBoards((prevBoards) => {
            return [...prevBoards, data];
          });
        }
      });
  };

  // Handle opening the create board modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModel = () => setOpenModal(true);
  const handleCloseModel = () => setOpenModal(false);

  return (
    <Container sx={{ overflow: "scroll" }} maxWidth="xl">
      <Grid container item className="boards-container">
        {/* Render each board */}
        {boards &&
          boards.map((board) => (
            <Board
              key={`board-${board.id}`}
              board={board}
              boards={boards}
              fetchProject={fetchProject}
              mode={mode}
              colors={colors}
              handleUpdateBoard={handleUpdateBoard}
              handleDeleteBoard={handleDeleteBoard}
              handleCreateBoard={handleCreateBoard}
            />
          ))}

        {/* Render the create board component */}
        <CreateBoard handleOpenModel={handleOpenModel} />

        {/* Render the board modal */}
        <BoardModal
          openModal={openModal}
          handleCloseModel={handleCloseModel}
          mode={mode}
          handleCreateBoard={handleCreateBoard}
        />
      </Grid>
    </Container>
  );
};

export default Boards;
