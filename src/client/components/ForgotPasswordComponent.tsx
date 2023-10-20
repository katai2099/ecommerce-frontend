import { Check } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PasswordChangeSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box borderRadius="50%" border="2px solid green" padding="8px">
        <Check
          color="success"
          sx={{
            fontSize: "48px",
          }}
        />
      </Box>
      <Typography variant="h2" pb="8px">
        Password Changed!
      </Typography>
      <Typography pb="16px" fontSize="14px">
        Your password has been changed successfully
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to homepage
      </Button>
    </Box>
  );
};
