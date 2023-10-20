import { Cancel } from "@mui/icons-material";
import { Box, Paper, Typography, colors } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  resetPassword,
  validatePassword,
  validateRetypePassword,
  verifyResetPasswordToken,
} from "../../controllers/user";
import { useQuery } from "../../hooks/useQuery";
import { IErrorResponse } from "../../model/common";
import { EPasswordField } from "../components/EPasswordField";
import { PasswordChangeSuccess } from "../components/ForgotPasswordComponent";
import { ILoginDetails } from "../components/UserDetail";
import { LoadingButton } from "../components/common/LoadingButton";
import { Navbar } from "../components/navbar/Navbar";

export const ResetPassword = () => {
  const [loginDetails, setLoginDetails] = useState<ILoginDetails>({
    password: "",
    confirmPassword: "",
  });
  const [loginDetailsError, setLoginDetailsError] = useState<ILoginDetails>({
    password: "",
    confirmPassword: "",
  });
  const [submitLoginDetailLoading, setSubmitLoginDetailLoading] =
    useState<boolean>(false);
  const [submitLoginDetailError, setSubmitLoginDetailError] =
    useState<string>("");
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleLoginDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
    setLoginDetailsError({
      ...loginDetailsError,
      [event.target.name]: "",
    });
  };

  let query = useQuery();
  const token = query.get("token");

  useEffect(() => {
    if (token !== null) {
      verifyResetPasswordToken(token).catch((err) => {
        const errorRes = err.response?.data as IErrorResponse;
        if (errorRes.status === 400) {
          navigate("/forgetpassword", {
            replace: true,
            state: { expired: true },
          });
        }
      });
    }
  }, []);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const errorPassword = validatePassword(loginDetails.password);
    const errorConfirmPassword = validateRetypePassword(
      loginDetails.confirmPassword,
      loginDetails.password,
      "Confirm password is required"
    );
    if (errorPassword !== "" || errorConfirmPassword !== "") {
      setLoginDetailsError({
        password: errorPassword,
        confirmPassword: errorConfirmPassword,
      });
      return;
    }
    setSubmitLoginDetailLoading(true);
    resetPassword(loginDetails.password, token!)
      .then(() => {
        setUpdateSuccess(true);
        setSubmitLoginDetailError("");
      })
      .catch((err) => {
        const errorRes = err.response?.data as IErrorResponse;
        if (errorRes.status === 404) {
          setSubmitLoginDetailError(errorRes.message);
        } else if (errorRes.status === 400) {
          navigate("/forgetpassword", {
            replace: true,
            state: { expired: true },
          });
        } else {
          setSubmitLoginDetailError("Something went wrong");
        }
      })
      .finally(() => {
        setSubmitLoginDetailLoading(false);
      });
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
          maxWidth: { sm: "510px", md: "45%" },
          minWidth: { md: "35%" },
        }}
      >
        {updateSuccess ? (
          <PasswordChangeSuccess />
        ) : (
          <>
            <Typography variant="h2" fontWeight="bold" letterSpacing="-0.6px">
              Set New Password
            </Typography>
            <Typography color="GrayText" m="16px 0 24px">
              Enter a new password below to reset your password
            </Typography>
            {!!submitLoginDetailError && (
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
                  <Typography color={colors.grey[800]}>
                    Please try again.
                  </Typography>
                </Box>
              </Box>
            )}
            <Box width="100%">
              <EPasswordField
                fullWidth
                label="Password"
                name="password"
                value={loginDetails.password}
                error={loginDetailsError.password}
                onChange={handleLoginDetailsChange}
              />
              <EPasswordField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                value={loginDetails.confirmPassword}
                error={loginDetailsError.confirmPassword}
                onChange={handleLoginDetailsChange}
              />
              <LoadingButton
                fullWidth
                loading={submitLoginDetailLoading}
                title="Reset Password"
                onClick={handleSubmit}
              />
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};
