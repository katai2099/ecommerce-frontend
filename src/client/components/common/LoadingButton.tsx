import { Button, CircularProgress, SxProps } from "@mui/material";
import { MouseEvent } from "react";

export interface LoadingButtonProps {
  loading: boolean;
  fullWidth?: boolean;
  title: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outlinedLoading?: boolean;
  type?: "submit" | "button";
  sxProps?: SxProps;
}

export const LoadingButton = ({
  onClick,
  title,
  loading,
  disabled = false,
  fullWidth = false,
  outlinedLoading = false,
  type = "button",
  sxProps,
}: LoadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      fullWidth={fullWidth}
      variant="contained"
      disabled={loading || disabled}
      type={type}
      sx={{
        ...(outlinedLoading && {
          position: "relative",
          padding: "10px 15px",
          color: "primary",
          "&.Mui-disabled": {
            color: disabled ? "#4b4b4b" : "white",
            backgroundColor: disabled ? "diabled" : "black",
            cursor: disabled ? "not-allowed" : "default",
            pointerEvents: "all !important",
          },
        }),
        ...sxProps,
      }}
    >
      <span style={{ visibility: loading ? "hidden" : "visible" }}>
        {title}
      </span>
      {loading && (
        <CircularProgress
          size={24}
          color="inherit"
          sx={{ position: "absolute" }}
        />
      )}
    </Button>
  );
};
