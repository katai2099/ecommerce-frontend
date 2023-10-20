import { Cancel } from "@mui/icons-material";
import { Box, Button, Paper, Typography, colors } from "@mui/material";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forgetPassword, validateEmail } from "../../controllers/user";
import { showSnackBar } from "../../controllers/utils";
import { IErrorResponse } from "../../model/common";
import { ETextField } from "../components/common/ETextField";
import { LoadingButton } from "../components/common/LoadingButton";
import { Navbar } from "../components/navbar/Navbar";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [tokenExpired, setTokenExpired] = useState<boolean>(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
    setEmailError("");
  };

  useEffect(() => {
    if (state && state.expired) {
      setTokenExpired(true);
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTokenExpired(false);
    const valid = validateEmail(email);
    if (valid.length !== 0) {
      setEmailError(valid);
      return;
    }
    setSubmitLoading(true);
    forgetPassword(email)
      .then(() => {
        setSubmitError("");
        showSnackBar("send reset link success", "success");
      })
      .catch((err: AxiosError) => {
        const errorRes = err.response?.data as IErrorResponse;
        if (errorRes.status === 404) {
          setSubmitError(errorRes.message);
        } else {
          setSubmitError("Something went wrong");
        }
      })
      .finally(() => setSubmitLoading(false));
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
          maxWidth: { sm: "510px", md: "30%" },
        }}
      >
        <Typography variant="h2" fontWeight="bold" letterSpacing="-0.5px">
          Forgot password
        </Typography>

        <Typography color="GrayText" m="8px 0 16px">
          Enter the email associated with your account and we'll send you a link
          so you can start with reset your password
        </Typography>
        {!!submitError && (
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
              <Typography color={colors.grey[800]}>{submitError}</Typography>
              <Typography color={colors.grey[800]}>
                Please try again.
              </Typography>
            </Box>
          </Box>
        )}
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
            loading={submitLoading}
            title="Send reset link"
            onClick={handleSubmit}
          />
        </Box>
        {tokenExpired && (
          <Typography mt="8px" color="error" fontSize="12px">
            This request to reset your password has expired. Please try again.
          </Typography>
        )}
        <Button
          disabled={submitLoading}
          sx={{
            m: "16px 0 ",
            textTransform: "none",
            textDecoration: "underline",
            fontSize: "14px",
          }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Back to login
        </Button>
      </Paper>
    </Box>
  );
};
