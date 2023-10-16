import { Cancel } from "@mui/icons-material";
import { Box, Paper, Typography, colors } from "@mui/material";
import { useState } from "react";
import { EPasswordField } from "../components/EPasswordField";
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
        <Typography variant="h2" fontWeight="bold" letterSpacing="-0.6px">
          Set New Password
        </Typography>
        <Typography color="GrayText" m="16px 0 24px">
          Enter a new password below to reset your password
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
            loading={false}
            title="Reset Password"
            onClick={function (
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};
