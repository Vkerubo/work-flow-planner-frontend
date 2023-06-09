import React from "react";
import { Typography, Box } from "@mui/material";
import LinearProgress from "@mui/material";

export default function LinearProgressWithLabel(props) {
  return (
    <Box className="flex">
      {/* Box to contain the LinearProgress component */}
      <Box sx={{ width: "100%", mr: 1 }}>
        {/* LinearProgress component to display the progress */}
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            backgroundColor: "rgb(78 78 78 / 20%)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: props.barColor,
            },
          }}
        />
      </Box>
      {/* Box to display the progress percentage */}
      <Box sx={{ minWidth: 35 }}>
        {/* Typography component to display the progress percentage */}
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
