import { Cancel, LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Grid, Paper, Typography, colors } from "@mui/material";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  register,
  validateEmail,
  validateFirstname,
  validateLastname,
  validatePassword,
  validateRegistrationData,
  validateRetypePassword,
} from "../../controllers/user";
import { isRecordValueEmpty } from "../../controllers/utils";
import { RegistrationForm } from "../../model/authentication";
import { ErrorResponse, IErrorResponse } from "../../model/common";
import { Role } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
import { EPasswordField } from "../components/EPasswordField";
import { ETextField } from "../components/common/ETextField";
import { LoadingButton } from "../components/common/LoadingButton";
import { Navbar } from "../components/navbar/Navbar";

export const Register = () => {
  const [registrationData, setRegistrationData] = useState<RegistrationForm>(
    new RegistrationForm()
  );
  const [registrationError, setRegistrationError] = useState<RegistrationForm>(
    new RegistrationForm()
  );
  const [registering, setRegistering] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<IErrorResponse>(
    new ErrorResponse()
  );
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);
  const role = useSelector((state: RootState) => state.user.role);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setRegistrationError({
      ...registrationError,
      [event.currentTarget.name]: "",
    });
  };

  const validationFunctions: Record<string, (value: string) => string> = {
    firstname: validateFirstname,
    lastname: validateLastname,
    email: validateEmail,
    password: validatePassword,
    retypePassword: (value: string) =>
      validateRetypePassword(value, registrationData.password),
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.currentTarget.value;
    const fieldName = event.currentTarget.name;
    const validationFunction = validationFunctions[fieldName];
    if (validationFunction) {
      const validationError = validationFunction(value);
      setRegistrationError({
        ...registrationError,
        [fieldName]: validationError,
      });
    }
  };

  const handleRegisterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const error = validateRegistrationData(registrationData);
    const isNonError = isRecordValueEmpty({ ...error });
    if (!isNonError) {
      setRegistrationError(error);
      return;
    }
    setRegistering(true);
    register(registrationData)
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((err: AxiosError) => {
        setErrorResponse(
          err.response
            ? (err.response.data as IErrorResponse)
            : new ErrorResponse()
        );
      })
      .finally(() => setRegistering(false));
  };

  if (isLogin && role === Role.ADMIN) {
    return <Navigate to="/admin/" replace />;
  } else if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Paper
        elevation={3}
        sx={{
          padding: "2rem 3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: { sm: "510px" },
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: "36px" }}>
          Create Your Account
        </Typography>
        {errorResponse.status !== 0 && (
          <Box
            display="flex"
            alignItems="center"
            bgcolor={colors.red[100]}
            width="100%"
            padding={1}
            mb={5}
          >
            <Cancel
              fontSize="large"
              sx={{
                color: `${colors.grey[800]}`,
              }}
            />
            <Box ml={1}>
              <Typography color={colors.grey[800]}>
                {errorResponse.status === 400
                  ? "Email already exists"
                  : "Something went wrong"}
              </Typography>
            </Box>
          </Box>
        )}
        <Box component="form" sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ETextField
                fullWidth={true}
                label="First name"
                placeholder="John"
                name="firstname"
                value={registrationData.firstname}
                onChange={handleOnChange}
                onBlur={handleBlur}
                error={registrationError.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ETextField
                fullWidth={true}
                label="Last name"
                placeholder="Smith"
                name="lastname"
                value={registrationData.lastname}
                onChange={handleOnChange}
                onBlur={handleBlur}
                error={registrationError.lastname}
              />
            </Grid>
          </Grid>
          <ETextField
            fullWidth={true}
            label="Email address"
            placeholder="example@mail.com"
            name="email"
            value={registrationData.email}
            onChange={handleOnChange}
            onBlur={handleBlur}
            error={registrationError.email}
          />
          <EPasswordField
            label="Password"
            name={"password"}
            value={registrationData.password}
            onChange={handleOnChange}
            onBlur={handleBlur}
            error={registrationError.password}
          />
          <EPasswordField
            label="Retype password"
            name="retypePassword"
            value={registrationData.retypePassword}
            onChange={handleOnChange}
            onBlur={handleBlur}
            error={registrationError.retypePassword}
          />
          <LoadingButton
            loading={registering}
            title="Create Account"
            type="submit"
            fullWidth={true}
            sxProps={{ mt: 1, mb: 2 }}
            onClick={handleRegisterClick}
          />
        </Box>
        <Box>
          Already have an account? <Link to="/login">Login</Link>
        </Box>
      </Paper>
    </Box>
  );
};
