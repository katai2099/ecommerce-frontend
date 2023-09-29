import { Box, TextField } from "@mui/material";
import { ChangeEvent } from "react";

interface ETextFieldProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (field: string, value: any) => void;
}

export const ETextField = ({
  label,
  placeholder = "",
  onChange,
  name,
  value,
}: ETextFieldProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.name, event.target.value);
  };
  return (
    <Box mb="16px" width="100%">
      <TextField
        // error
        variant="outlined"
        helperText="please enter"
        label={label}
        name={name}
        placeholder={placeholder}
        value={value}
        required
        fullWidth
        onChange={handleOnChange}
      />
    </Box>
  );
};
