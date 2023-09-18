import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent } from "react";
import { IAddress } from "../../model/user";

interface AddressDialogProps {
  isEdit?: boolean;
  selectedAddress: IAddress;
  disableDefault: boolean;
  onAddressChange: (field: string, value: any) => void;
  onSubmit: () => void;
}

export interface DialogProps {
  open: boolean;
  handleDialogState: (open: boolean) => void;
}

export const AddressDialog = ({
  open,
  isEdit = false,
  selectedAddress,
  disableDefault,
  handleDialogState,
  onAddressChange,
  onSubmit,
}: AddressDialogProps & DialogProps) => {
  const handleAddressUpdate = (field: string, value: any) => {
    onAddressChange(field, value);
  };

  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleAddressUpdate(event.currentTarget.name, event.currentTarget.value);
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={() => {
        handleDialogState(false);
      }}
    >
      <DialogTitle>{isEdit ? "Edit address" : "Add new address"}</DialogTitle>
      <IconButton
        onClick={() => {
          handleDialogState(false);
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent sx={{ mx: "12px" }}>
        <form>
          <Box mb="16px">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="First Name"
              name="firstname"
              value={selectedAddress.firstname}
              required
              fullWidth
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="Last Name"
              name="lastname"
              value={selectedAddress.lastname}
              required
              fullWidth
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="Phone Number"
              name="phoneNumber"
              value={selectedAddress.phoneNumber}
              required
              fullWidth
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px" display="flex">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="Steet name"
              name="street"
              value={selectedAddress.street}
              required
              fullWidth
              onChange={handleAddressChange}
            />
            <TextField
              variant="outlined"
              label="House no"
              name="houseNumber"
              value={selectedAddress.houseNumber}
              required
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="Zip Code"
              name="zipCode"
              value={selectedAddress.zipCode}
              required
              fullWidth
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="City"
              name="city"
              value={selectedAddress.city}
              required
              fullWidth
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px">
            <TextField
              // error
              variant="outlined"
              helperText="please enter"
              label="Country"
              name="country"
              value={selectedAddress.country}
              required
              fullWidth
              onChange={handleAddressChange}
            />
          </Box>
          <Box mb="16px">
            <FormGroup>
              <FormControlLabel
                disabled={disableDefault}
                name="isDefault"
                onChange={(event: SyntheticEvent, value: boolean) => {
                  handleAddressUpdate("isDefault", value);
                }}
                checked={selectedAddress.isDefault}
                control={<Checkbox size="medium" />}
                label="Default Address"
              />
            </FormGroup>
          </Box>
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              console.log(selectedAddress);
              onSubmit();
            }}
          >
            {isEdit ? "Update Address" : "Save Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
