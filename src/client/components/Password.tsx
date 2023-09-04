import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

export interface PasswordProps {
  title: string;
  errorText: string;
}

export const Password = ({ title, errorText }: PasswordProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <InputLabel>{title}</InputLabel>
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
        <FormHelperText error>{errorText}</FormHelperText>
      </FormControl>
    </Box>
  );
};
