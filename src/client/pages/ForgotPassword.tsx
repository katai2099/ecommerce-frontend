import { Cancel } from "@mui/icons-material";
import { Box, Button, Paper, Typography, colors } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ETextField } from "../components/common/ETextField";
import { LoadingButton } from "../components/common/LoadingButton";
import { Navbar } from "../components/navbar/Navbar";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setEmailError("");
  };

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
      <Navbar />
      <Paper
        sx={{
          padding: { xs: "16px", sm: "2rem 3rem" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: { sm: "510px", md: "35%" },
        }}
      >
        <Typography variant="h2" fontWeight="bold" letterSpacing="-0.5px">
          Forgot password
        </Typography>

        <Typography color="GrayText" m="8px 0 16px">
          Enter the email associated with your account and we'll send you a link
          so you can start with reset your password
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          bgcolor={colors.red[100]}
          width="100%"
          padding={1}
          mb={2}
        >
          <Cancel
            fontSize="large"
            sx={{
              color: `${colors.grey[800]}`,
            }}
          />
          <Box ml={1}>
            <Typography color={colors.grey[800]}>
              Something went wrong
            </Typography>
            <Typography color={colors.grey[800]}>Please try again.</Typography>
          </Box>
        </Box>
        <Box width="100%">
          <ETextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            error={emailError}
            onChange={handleEmailChange}
          />
          <LoadingButton
            fullWidth
            loading={false}
            title="Send reset link"
            onClick={function (
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
        <Link to="/login">
          <Button
            sx={{
              m: "16px 0 ",
              textTransform: "none",
              textDecoration: "underline",
              fontSize: "14px",
            }}
          >
            Back to login
          </Button>
        </Link>
      </Paper>
    </Box>
  );
};
