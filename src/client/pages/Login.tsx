import {
  ShoppingBagOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { loginAction } from "../../actions/userActions";
import { LoginPostData } from "../../model/authentication";
import { useAppDispatch } from "../../store/configureStore";
import { Navbar } from "../components/navbar/Navbar";

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleLoginClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = new LoginPostData();
    data.password = btoa(password);
    data.email = btoa(email);
    dispatch(loginAction(data));
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
        elevation={3}
        sx={{
          padding: "2rem 3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <ShoppingBagOutlined />
        </Avatar>
        <Typography variant="h5" component="h1">
          Welcome To Ecommerce
        </Typography>
        <Box component="form">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel>Email address</InputLabel>
            <FormControl>
              <OutlinedInput
                value={email}
                onChange={handleEmailChange}
                fullWidth
                // error
                required
                placeholder="example@mail.com"
              />
              <FormHelperText error>Email is required</FormHelperText>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <InputLabel>Password</InputLabel>
            <FormControl>
              <OutlinedInput
                value={password}
                onChange={handlePasswordChange}
                fullWidth
                error
                required
                placeholder="*******"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>Password is required</FormHelperText>
            </FormControl>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleLoginClick}
          >
            Log in
          </Button>
        </Box>
        <Box>or</Box>
        <Button fullWidth variant="contained">
          Continue with Google
        </Button>
        <Box>
          Don't have account? &nbsp;
          <Link to="/register">Sign up</Link>
        </Box>
        <Box>
          Forgot your password? <a href="#">Reset It</a>
        </Box>
      </Paper>
    </Box>
  );
};
