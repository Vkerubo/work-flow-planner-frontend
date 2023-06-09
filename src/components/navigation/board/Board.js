import * as React from "react";
import DropdownMenu from "../DropdownMenu";
import BoardModal from "../modal/BoardModal";
import TaskModal from "../modal/TaskModal";
import Tasks from "../../containers/Tasks";
import {
  Grid,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";

const Board = ({
  board,
  boards,
  fetchProject,
  handleDeleteBoard,
  handleUpdateBoard,
  colors,
  mode,
}) => {
  const { name, id } = board;
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    // Update the 'tasks' state when 'board' changes
    setTasks(board.tasks);
  }, [board]);
};

export default Board;
