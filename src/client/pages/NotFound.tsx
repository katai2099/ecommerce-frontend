import { Box, Button, Container, Typography } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        minHeight="100vh"
      >
        <Typography variant="h1" fontSize="96px">
          404
        </Typography>
        <Typography variant="h2" mt="12px">
          Sorry, Page Not Found!
        </Typography>
        <Typography color="GrayText" fontSize="16px" mt="16px">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Button
          sx={{ mt: "16px" }}
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export const NotFoundRedirect = () => {
  return <Navigate to="/404" replace />;
};
