import * as React from "react";
import "../css/task.css";
import { parseDate } from "../helpers/changeDate";
import Task from "../components/navigation/task/Task";
import { Grid, Typography } from "@mui/material";

//render lists of tasks
const Tasks = ({
  tasks,
  setTasks,
  fetchProject,
  mode,
  boards,
  currentBoardId,
}) => {
  // State variables to hold completed and incomplete tasks
  const [completedTasks, setCompletedTasks] = React.useState(
    tasks
      ? tasks
          .filter((task) => task.completed === true)
          .sort((a, b) => parseDate(a.due_date) - parseDate(b.due_date))
      : []
  );
  const [incompleteTasks, setIncompleteTasks] = React.useState(
    tasks
      ? tasks
          .filter((task) => task.completed === false)
          .sort((a, b) => parseDate(a.due_date) - parseDate(b.due_date))
      : []
  );

  React.useEffect(() => {
    // Update completed and incomplete tasks when tasks prop changes
    setCompletedTasks(
      tasks
        ? tasks
            .filter((task) => task.completed === true)
            .sort((a, b) => parseDate(a.due_date) - parseDate(b.due_date))
        : []
    );
    setIncompleteTasks(
      tasks
        ? tasks
            .filter((task) => task.completed === false)
            .sort((a, b) => parseDate(a.due_date) - parseDate(b.due_date))
        : []
    );
  }, [tasks]);

  // Combine incomplete and completed tasks into a single array
  const newTaskOrder = [incompleteTasks, completedTasks].flat();

  // Toggle completion status of a task
  const completeTask = (task) => {
    const updatedTask = { ...task, completed: !task.completed };

    updateTask(updatedTask);
  };

  // Update task in the state and make API call to update the task in the database
  const updateTask = (updatedTask) => {
    let updatedTasks;
    if (updatedTask.board_id === currentBoardId) {
      updatedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    } else {
      updatedTasks = tasks.filter((task) => task.id !== updatedTask.id);
    }

    fetch(`/api/tasks/${updatedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        board_id: updatedTask.board_id,
        completed: updatedTask.completed,
        description: updatedTask.description,
        due_date: updatedTask.due_date,
        name: updatedTask.name,
        priority: updatedTask.priority,
        status: updatedTask.status,
      }),
    }).then(() => {
      if (updatedTask.board_id !== currentBoardId) {
        fetchProject();
      }
    });

    setTasks(updatedTasks);
  };

  // Delete a task from the state and make API call to delete the task from the database
  const handleDeleteTask = (deleteTask) => {
    const updatedTasks = tasks.filter((task) => task.id !== deleteTask.id);

    fetch(`/api/tasks/${deleteTask.id}`, {
      method: "DELETE",
    });
    setTasks(updatedTasks);
  };

  return (
    <Grid container>
      {newTaskOrder.length !== 0 ? (
        newTaskOrder.map((task) => (
          <Task
            task={task}
            key={`task-${task.id}`}
            mode={mode}
            boards={boards}
            currentBoardId={currentBoardId}
            completeTask={completeTask}
            updateTask={updateTask}
            handleDeleteTask={handleDeleteTask}
          />
        ))
      ) : (
        <Grid container item alignItems="center" justifyContent="center">
          <Typography
            variant="h6"
            component="p"
            gutterBottom
            sx={{ color: (theme) => theme.palette.text.disabled }}
          >
            No Tasks Yet
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Tasks;
