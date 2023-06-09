import * as React from "react";
import lightTheme from "./theme/light-theme";
import darkTheme from "./theme/dark-theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./containers/Login";
import Projects from "./containers/Projects";
import ProjectDashboard from "./containers/ProjectDashboard";
import Box from "@mui/material/Box";
import Layout from "./containers/Layout";

const App = () => {
  // handle dark mode
  const [mode, setMode] = React.useState(true);
  const appliedTheme = createTheme(mode ? lightTheme : darkTheme);

  const toggleTheme = () => {
    setMode(!mode);
  };

  // handle projects
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch projects from the API
  const fetchProjects = () => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  };

  // Update a project using the PATCH method
  const patchProjects = (project) => {
    fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        favorite: project.favorite,
        title: project.title,
        color: project.color,
      }),
    });
  };

  // Create a new project using the POST method
  const postProjects = (project) => {
    fetch("/api/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects((prevProjects) => {
          return [...prevProjects, data];
        });
      });
  };

  // Delete a project
  const handleDeleteProject = (deleteProject) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deleteProject.id
    );

    fetch(`/api/projects/${deleteProject.id}`, {
      method: "DELETE",
    });

    setProjects(updatedProjects);
  };

  // Update a project and set the updated projects state
  const handleUpdatingProject = (changedProject) => {
    patchProjects(changedProject);

    const updatedProjects = projects.map((project) =>
      project.id === changedProject.id ? changedProject : project
    );
    setProjects(updatedProjects);
  };

  //handle search
  const [search, setSearch] = React.useState("");
  const filterProjects = projects.filter((project) => {
    return project.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ThemeProvider theme={appliedTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Router>
          <Layout
            toggleTheme={toggleTheme}
            mode={mode}
            projects={projects}
            search={search}
            setSearch={setSearch}
            fetchProjects={fetchProjects}
          >
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/projects"
                element={
                  <Projects
                    projects={filterProjects}
                    mode={mode}
                    patchProjects={patchProjects}
                    postProjects={postProjects}
                    handleUpdatingProject={handleUpdatingProject}
                    handleDeleteProject={handleDeleteProject}
                  />
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <ProjectDashboard
                    mode={mode}
                    handleUpdatingProject={handleUpdatingProject}
                    handleDeleteProject={handleDeleteProject}
                  />
                }
              />
            </Routes>
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>
  );
};
export default App;
