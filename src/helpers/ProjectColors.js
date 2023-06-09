import { palette } from "../theme/palette";

export const ProjectColors = (project) => {
  const color = palette.find((c) => c.mainColor === project.color);
  if (color) {
    return color;
  } else {
    // Return a default color object when the project color is not found
    return {
      mainColor: "#000000",
      colorLight: "#ffffff",
      color: "#000000",
      colorDark: "#000000",
    };
  }
};
