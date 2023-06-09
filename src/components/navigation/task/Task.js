import * as React from "react";
import { changeDate } from "../../../helpers/changeDate";
import { priorityColor, statusColor } from "../../../helpers/tasktags";
import DropdownMenu from "../DropDownMenu";
import TaskModal from "../modal/TaskModal";

import {
  Card,
  Container,
  CardActionArea,
  Tooltip,
  Grid,
  Button,
  IconButton,
  CardContent,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";

// The Task component represents a task card
const Task = ({
  task,
  mode, //Represents the mode of the task (e.g., "view", "edit")
  completeTask, // Function to mark the task as complete
  updateTask, // Function to update the task
  handleDeleteTask,
  boards, // Array of boards
  currentBoardId, // ID of the current board
}) => {
  const { name, due_date, priority, status } = task; // Extracting task properties

  const formattedDate = changeDate(due_date); // Format the due date of the task

  //task menu to see more options
  const [moreAnchorEl, setMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(moreAnchorEl);

  const handleMenuOpen = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMoreAnchorEl(null);
  };

  //handle edit modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModel = () => setOpenModal(true);
  const handleCloseModel = () => setOpenModal(false);

  return (
    <Grid item xs={12}>
      <Card
        elevation={4}
        className="task-card b-radius-sm"
        sx={{
          backgroundColor: mode
            ? "rgb(243 246 253 / 50%)"
            : "rgb(255 255 255 / 5%)",
        }}
      >
        <CardActionArea className="card-actions">
          <Tooltip title="complete task">
            <IconButton onClick={() => completeTask(task)}>
              {task.completed ? (
                <CheckCircleIcon color="success" />
              ) : (
                <CheckCircleOutlineIcon color="inherit" />
              )}
            </IconButton>
          </Tooltip>

          {/* Button to show task options */}
          <Tooltip title="Task Options">
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </CardActionArea>
        <CardContent>
          <Grid container flexDirection="column" className="flex">
            {/* Task name */}
            <Typography variant="subtitle1" component="h4" align="center">
              {name}
            </Typography>
            <Grid className="flex">
              {/* Task due date */}
              <IconButton size="small">
                <ScheduleIcon fontSize="inherit" />
              </IconButton>
              <Typography variant="subtitle2">{formattedDate}</Typography>
            </Grid>

            <Grid item container className="task-callouts flex">
              {/* Task priority */}
              <Button variant="contained" className={priorityColor(priority)}>
                {priority}
              </Button>
              <Button variant="contained" className={statusColor(status)}>
                {status}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* popups */}
      <DropdownMenu
        moreAnchorEl={moreAnchorEl}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        handleOpenModel={handleOpenModel}
        handleDelete={handleDeleteTask}
        component={task}
        componentType="Task"
      />

      <TaskModal
        openModal={openModal}
        handleCloseModel={handleCloseModel}
        mode={mode}
        task={task}
        boards={boards}
        currentBoardId={currentBoardId}
        updateTask={updateTask}
      />
    </Grid>
  );
};

export default Task;
