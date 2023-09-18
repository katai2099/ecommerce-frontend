import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  updatePasswordAction,
  updateUserDetailsAction,
} from "../../actions/userActions";
import { IUserDetailsRequest } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";

interface ILoginDetails {
  password: string;
  confirmPassword: string;
}

export const UserDetail = () => {
  const [userDetails, setUserDetails] = useState<IUserDetailsRequest>({
    firstname: "",
    lastname: "",
  });

  const [loginDetails, setLoginDetails] = useState<ILoginDetails>({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.user);

  const detailsDisable =
    user.firstname === userDetails.firstname &&
    user.lastname === userDetails.lastname;

  useEffect(() => {
    const currentUserDetails: IUserDetailsRequest = {
      firstname: user.firstname,
      lastname: user.lastname,
    };
    setUserDetails(currentUserDetails);
  }, [user.firstname, user.lastname]);

  const handleUserDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleLoginDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserDetailSubmit = () => {
    dispatch(updateUserDetailsAction(userDetails));
  };

  const handleUpdatePasswordSubmit = () => {
    dispatch(updatePasswordAction(loginDetails.password))
      .then(() => {
        setLoginDetails({ password: "", confirmPassword: "" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box width="100%">
      <Paper sx={{ padding: "16px 32px 32px" }}>
        <Typography
          variant="h3"
          fontSize="24px"
          fontWeight="bold"
          letterSpacing="-0.5px"
          mb="20px"
        >
          Update Details
        </Typography>
        <Box width="50%">
          <form>
            <Box mb="16px">
              <TextField
                label="First Name"
                fullWidth
                name="firstname"
                value={userDetails.firstname}
                onChange={handleUserDetailsChange}
              />
            </Box>
            <Box mb="32px">
              <TextField
                label="Last Name"
                name="lastname"
                fullWidth
                value={userDetails.lastname}
                onChange={handleUserDetailsChange}
              />
            </Box>
            <Button
              variant="contained"
              fullWidth
              disabled={detailsDisable}
              onClick={handleUserDetailSubmit}
            >
              Update my details
            </Button>
          </form>
        </Box>
      </Paper>
      <Paper sx={{ mt: "36px", padding: "16px 32px 32px" }}>
        <Typography
          variant="h3"
          fontSize="24px"
          fontWeight="bold"
          letterSpacing="-0.5px"
          mb="20px"
        >
          Update Login Details
        </Typography>
        <Box width="50%">
          <form>
            <Box mb="16px">
              <TextField label="Email" fullWidth disabled value={user.email} />
            </Box>
            <Box mb="16px">
              <FormControl fullWidth>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={loginDetails.password}
                  name="password"
                  onChange={handleLoginDetailsChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Box>
            <Box mb="32px">
              <FormControl fullWidth>
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  value={loginDetails.confirmPassword}
                  name="confirmPassword"
                  onChange={handleLoginDetailsChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText></FormHelperText>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdatePasswordSubmit}
            >
              Update login details
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};
