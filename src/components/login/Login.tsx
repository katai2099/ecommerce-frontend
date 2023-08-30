import {
  Adb,
  ShoppingBag,
  ShoppingBagOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
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
              fullWidth
              error
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
        <Button type="submit" fullWidth variant="contained">
          Log in
        </Button>
      </Box>
      <Box>or</Box>
      <Button fullWidth variant="contained">
        Continue with Google
      </Button>
      <Box>
        Don't have account? <Link to="/register">Sign up</Link>
      </Box>
      <Box>
        Forgot your password? <a href="#">Reset It</a>
      </Box>
    </Paper>
  );
};
