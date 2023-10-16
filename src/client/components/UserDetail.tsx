import { Box, Divider, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  updatePassword,
  updateUserDetails,
  validateFirstname,
  validateLastname,
  validatePassword,
  validateRetypePassword,
} from "../../controllers/user";
import { showSnackBar } from "../../controllers/utils";
import { IUserDetailsRequest } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
import { EPasswordField } from "./EPasswordField";
import { ETextField } from "./common/ETextField";
import { LoadingButton } from "./common/LoadingButton";

export interface ILoginDetails {
  password: string;
  confirmPassword: string;
}

export const UserDetail = () => {
  const [userDetails, setUserDetails] = useState<IUserDetailsRequest>({
    firstname: "",
    lastname: "",
  });
  const [userDetailsError, setUserDetailsError] = useState<IUserDetailsRequest>(
    {
      firstname: "",
      lastname: "",
    }
  );
  const [updateUserDetail, setUpdateUserDetail] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<ILoginDetails>({
    password: "",
    confirmPassword: "",
  });
  const [loginDetailsError, setLoginDetailsError] = useState<ILoginDetails>({
    password: "",
    confirmPassword: "",
  });
  const [updateLoginDetail, setUpdateLoginDetail] = useState<boolean>(false);
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
    setUserDetailsError({ ...userDetailsError, [event.target.name]: "" });
  };

  const handleLoginDetailsChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
    setLoginDetailsError({
      ...loginDetailsError,
      [event.target.name]: "",
    });
  };

  const handleUserDetailSubmit = () => {
    let errorEmpty = true;
    const firstnameError = validateFirstname(userDetails.firstname);
    const lastnameError = validateLastname(userDetails.lastname);
    if (firstnameError !== "" || lastnameError !== "") {
      setUserDetailsError({
        firstname: firstnameError,
        lastname: lastnameError,
      });
      return;
    }
    setUpdateUserDetail(true);
    updateUserDetails(userDetails)
      .then(() => {
        showSnackBar("user details updated", "success");
      })
      .catch((err) => {})
      .finally(() => {
        setUpdateUserDetail(false);
      });
  };

  const handleUpdatePasswordSubmit = () => {
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
    setUpdateLoginDetail(true);
    updatePassword(loginDetails.password)
      .then(() => {
        setLoginDetails({ password: "", confirmPassword: "" });
        showSnackBar("Login details updated", "success");
      })
      .catch((err) => {})
      .finally(() => {
        setUpdateLoginDetail(false);
      });
  };

  return (
    <Paper sx={{ padding: "16px 32px 32px" }}>
      <Typography variant="h3" mb="24px">
        Details
      </Typography>
      <Box
        sx={{
          padding: { xs: "16px 0px 32px", sm: "16px 32px 32px" },
        }}
      >
        <Typography
          fontSize="24px"
          fontWeight="bold"
          letterSpacing="-0.5px"
          mb="20px"
        >
          Update Details
        </Typography>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <form>
            <Box mb="16px">
              <ETextField
                label="First Name"
                fullWidth
                name="firstname"
                value={userDetails.firstname}
                error={userDetailsError.firstname}
                onChange={handleUserDetailsChange}
              />
            </Box>
            <Box mb="32px">
              <ETextField
                label="Last Name"
                name="lastname"
                fullWidth
                value={userDetails.lastname}
                error={userDetailsError.lastname}
                onChange={handleUserDetailsChange}
              />
            </Box>
            <LoadingButton
              fullWidth
              loading={updateUserDetail}
              title="Update my details"
              disabled={detailsDisable}
              onClick={handleUserDetailSubmit}
            ></LoadingButton>
          </form>
        </Box>
      </Box>
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          mt: "36px",
          padding: { xs: "16px 0px 32px", sm: "16px 32px 32px" },
        }}
      >
        <Typography
          fontSize="24px"
          fontWeight="bold"
          letterSpacing="-0.5px"
          mb="20px"
        >
          Update Login Details
        </Typography>
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <form>
            <Box mb="16px">
              <TextField label="Email" fullWidth disabled value={user.email} />
            </Box>
            <Box mb="16px">
              <EPasswordField
                label="Password"
                name={"password"}
                value={loginDetails.password}
                error={loginDetailsError.password}
                onChange={handleLoginDetailsChange}
              />
            </Box>
            <Box mb="32px">
              <EPasswordField
                label="Confirm Password"
                name={"confirmPassword"}
                value={loginDetails.confirmPassword}
                error={loginDetailsError.confirmPassword}
                onChange={handleLoginDetailsChange}
              />
            </Box>
            <LoadingButton
              fullWidth
              onClick={handleUpdatePasswordSubmit}
              title="Update login details"
              loading={updateLoginDetail}
            />
          </form>
        </Box>
      </Box>
    </Paper>
  );
};
