import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { ETextFieldProps } from "./common/ETextField";

export const EPasswordField = ({
  label,
  name,
  value,
  fullWidth = true,
  placeholder = "*******",
  error = "",
  onChange,
  onBlur,
}: ETextFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mb: "16px" }}>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          value={value}
          name={name}
          fullWidth={fullWidth}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          required
          placeholder={placeholder}
          label={label}
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!!error && <FormHelperText error>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
