import React from "react";
import {
  FormControl,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

const ColorPicker = ({ color, colors, setColor }) => {
  return (
    <FormControl xs={{ pb: 2 }}>
      {/* Render the label for the color picker */}
      <FormLabel>Project Color</FormLabel>
      {/* Group the radio inputs together */}
      <RadioGroup
        className="flex row"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      >
        {/* Mapping through the colors array */}
        {colors.map((color) => (
          <FormControlLabel
            control={<Radio />} // Renders a radio input
            value={color.mainColor}
            label="" // Empty label, as the color is represented by the radio input itself
            sx={{
              backgroundColor: color.mainColor, // Sets the background color of the radio input
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ColorPicker;

//renders a form control for selecting a project color.
