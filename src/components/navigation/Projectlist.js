import React from "react";

export const Projectlist = ({ list }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return <div>Projectlist</div>;
};
