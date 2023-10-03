import { Box, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface ETextFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  fullWidth?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const ETextField = ({
  label,
  placeholder = "",
  error = "",
  onChange,
  name,
  value,
  fullWidth = true,
  onBlur,
}: ETextFieldProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };
  return (
    <Box mb="16px" width="100%">
      <TextField
        error={!!error}
        variant="outlined"
        helperText={error}
        label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        required
        fullWidth={fullWidth}
        onChange={handleOnChange}
        onBlur={onBlur}
      />
    </Box>
  );
};
