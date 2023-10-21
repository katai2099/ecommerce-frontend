import Typography from "@mui/material/Typography";
import * as React from "react";

interface TitleProps {
  children?: React.ReactNode;
  bold?: boolean;
}

export default function Title(props: TitleProps) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      fontWeight={props.bold ? "bold" : ""}
    >
      {props.children}
    </Typography>
  );
}
