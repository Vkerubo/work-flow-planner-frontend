import React from "react";
import TextField from "@mui/material";

const TitleField = ({ title, setTitle, labelName }) => {
  return (
    <TextField
      onChange={(e) => setTitle(e.target.value)} //updates title state when input value changes
      value={title}
      label={labelName}
      variant="outlined" //applies an outlined style to the TextField.
      color="secondary"
      fullWidth //makes the TextField occupy the full width of its container.
    />
  );
};

export default TitleField;

//this component provides an input field for the title
