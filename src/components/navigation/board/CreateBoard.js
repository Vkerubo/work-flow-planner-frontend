import React from "react";
import { Grid, Box, Tooltip, IconButton } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const CreateBoard = ({ handleOpenModel }) => {
  return (
    <Grid item sx={{ minWidth: 150 }}>
      {/* Render a grid item */}
      <Box className="flex">
        {/* Display a tooltip for the create board button */}
        <Tooltip title="Create New Board">
          <IconButton
            aria-label="create board"
            color="inherit"
            onClick={handleOpenModel}
          >
            {/* Render the create board icon */}
            <ControlPointIcon />
          </IconButton>
        </Tooltip>
        {/* Display the text "Create Board" */}
        Create Board
      </Box>
    </Grid>
  );
};

export default CreateBoard;
