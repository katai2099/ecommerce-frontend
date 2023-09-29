import { Box, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { IAddress } from "../../model/user";

interface AddressFormProps {
  selectedAddress: IAddress;
  onAddressChange: (field: string, value: any) => void;
}

export const AddressForm = ({
  selectedAddress,
  onAddressChange,
}: AddressFormProps) => {
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAddressChange(event.currentTarget.name, event.currentTarget.value);
  };

  return (
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
    </form>
  );
};
