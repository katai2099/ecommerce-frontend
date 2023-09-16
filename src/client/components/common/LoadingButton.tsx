import { Button, CircularProgress } from "@mui/material";

export interface LoadingButtonProps {
  loading: boolean;
  title: string;
  onClick: () => void;
}

export const LoadingButton = ({
  onClick,
  title,
  loading,
}: LoadingButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant={"contained"}
      disabled={loading}
      sx={{
        position: "relative",
        padding: "10px 15px",
        color: "primary",
        "&.Mui-disabled": {
          color: "white",
          backgroundColor: "black",
        },
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
