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
  const [completedTasks, setCompletedTasks] = React.useState([]);
  const [incompleteTasks, setIncompleteTasks] = React.useState([]);

  React.useEffect(() => {
    // Fetch tasks from the database
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:9292/tasks");
        const data = await response.json();

        // Sort tasks by due date
        const sortedTasks = data.sort(
          (a, b) => parseDate(a.due_date) - parseDate(b.due_date)
        );

        // Separate completed and incomplete tasks
        const completed = sortedTasks.filter((task) => task.completed === true);
        const incomplete = sortedTasks.filter(
          (task) => task.completed === false
        );

        setCompletedTasks(completed);
        setIncompleteTasks(incomplete);
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Combine incomplete and completed tasks into a single array
  const newTaskOrder = [incompleteTasks, completedTasks].flat();

  // Toggle completion status of a task
  const completeTask = (task) => {
    const updatedTask = { ...task, completed: !task.completed };

    updateTask(updatedTask);
  };

  // Update task in the state and make API call to update the task in the database
  const updateTask = (updatedTask) => {
    const updatedTasks = newTaskOrder.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    fetch(`http://localhost:9292/tasks/${updatedTask.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(updatedTask),
    }).then(() => {
      setTasks(updatedTasks);
      if (updatedTask.board_id !== currentBoardId) {
        fetchProject();
      }
    });
  };

  // Delete a task from the state and make API call to delete the task from the database
  const handleDeleteTask = (deleteTask) => {
    const updatedTasks = newTaskOrder.filter(
      (task) => task.id !== deleteTask.id
    );

    fetch(`http://localhost:9292/tasks/${deleteTask.id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(updatedTasks);
    });
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
