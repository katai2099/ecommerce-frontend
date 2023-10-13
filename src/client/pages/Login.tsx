import { Cancel, ShoppingBagOutlined } from "@mui/icons-material";
import { Avatar, Box, Paper, Typography, colors } from "@mui/material";
import { AxiosError } from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login, validateEmail, validatePassword } from "../../controllers/user";
import { isRecordValueEmpty } from "../../controllers/utils";
import { LoginPostData } from "../../model/authentication";
import { ErrorResponse, IErrorResponse } from "../../model/common";
import { Role } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
import { EPasswordField } from "../components/EPasswordField";
import { ETextField } from "../components/common/ETextField";
import { LoadingButton } from "../components/common/LoadingButton";
import { Navbar } from "../components/navbar/Navbar";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginPostData>(
    new LoginPostData()
  );
  const [loginErrorData, setloginErrorData] = useState<LoginPostData>(
    new LoginPostData()
  );
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<IErrorResponse>(
    new ErrorResponse()
  );
  const navigate = useNavigate();
  const isLogin = useSelector((state: RootState) => state.user.loggedIn);
  const role = useSelector((state: RootState) => state.user.role);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    setloginErrorData({
      ...loginErrorData,
      [event.currentTarget.name]: "",
    });
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const validationFunction =
      event.currentTarget.name === "email" ? validateEmail : validatePassword;
    setloginErrorData({
      ...loginErrorData,
      [event.currentTarget.name]: validationFunction(event.currentTarget.value),
    });
  };

  const handleLoginClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const emailValidationText = validateEmail(loginData.email);
    const passwordValidationText = validatePassword(loginData.password);
    const isValidatedEmail = isRecordValueEmpty({
      email: emailValidationText,
    });
    const isValidatedPassword = isRecordValueEmpty({
      password: passwordValidationText,
    });

    if (!isValidatedEmail || !isValidatedPassword) {
      setloginErrorData({
        email: !isValidatedEmail ? emailValidationText : "",
        password: !isValidatedPassword ? passwordValidationText : "",
      });
      return;
    }
    setLoggingIn(true);
    login(loginData.email, loginData.password)
      .then((res) => {
        if (res.role === Role.ADMIN) {
          return navigate("/admin/", { replace: true });
        }
        navigate("/", { replace: true });
      })
      .catch((err: AxiosError) => {
        setErrorResponse(err.response?.data! as IErrorResponse);
      })
      .finally(() => setLoggingIn(false));
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
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
          minWidth: { lg: "510px" },
          minHeight: "50vh",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <ShoppingBagOutlined />
        </Avatar>
        <Typography variant="h5" component="h1" sx={{ mb: "36px" }}>
          Welcome To Ecommerce
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
                {errorResponse.status === 401
                  ? "Incorrect email or password"
                  : "Something went wrong"}
              </Typography>
              <Typography color={colors.grey[800]}>
                Please try again.
              </Typography>
            </Box>
          </Box>
        )}
        <Box component="form" sx={{ width: "100%" }}>
          <ETextField
            label="Email address"
            name="email"
            value={loginData.email}
            error={loginErrorData.email}
            onChange={handleInputChange}
            placeholder="example@mail.com"
            onBlur={handleBlur}
          />
          <EPasswordField
            label="Password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            fullWidth={true}
            error={loginErrorData.password}
          />
          <Link to="#">
            <Box display="flex" justifyContent="flex-end" mb="16px">
              Forgot your password?
            </Box>
          </Link>
          <LoadingButton
            loading={loggingIn}
            title="Log in"
            onClick={handleLoginClick}
            fullWidth={true}
            type="submit"
            sxProps={{ mb: 2 }}
          />
        </Box>
        <Box>
          Don't have an account yet? &nbsp;
          <Link to="/register">Sign up</Link>
        </Box>
      </Paper>
    </Box>
  );
};
