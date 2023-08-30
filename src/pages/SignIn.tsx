import { Box, Container } from "@mui/material";
import { Login } from "../components/login/Login";

export const SignIn = () => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Login />
    </Box>
  );
};
