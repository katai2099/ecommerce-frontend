import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Password } from "../components/Password";
import { Navbar } from "../components/navbar/Navbar";

export const Register = () => {
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Your Account
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputLabel>First name</InputLabel>
                <FormControl>
                  <OutlinedInput
                    fullWidth
                    error={false}
                    required
                    placeholder="example@mail.com"
                  />
                  <FormHelperText error>First name is required</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
            <Grid item>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <InputLabel>Last name</InputLabel>
                <FormControl>
                  <OutlinedInput
                    fullWidth
                    error
                    required
                    placeholder="example@mail.com"
                  />
                  <FormHelperText error>Last name is required</FormHelperText>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
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
          <Password title="Password" errorText="Password is required" />
          <Password
            title="Retype Password"
            errorText="Please re-type password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
        </Box>
        <Box>or</Box>
        <Button fullWidth variant="contained">
          Continue with Google
        </Button>
        <Box>
          Already have an account? <Link to="/login">Login</Link>
        </Box>
      </Paper>
    </Box>
  );
};
