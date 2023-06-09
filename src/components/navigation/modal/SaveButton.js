import React from "react";
import Button from "@mui/material/Button";

export const SaveButton = ({ title }) => {
  return (
    <Button type="submit" color="primary" variant="contained">
      {title}
    </Button>
  );
};

//renders a Button component from MUI, which represents a clickable button element.
