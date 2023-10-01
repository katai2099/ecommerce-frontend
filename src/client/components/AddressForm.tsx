import { Box } from "@mui/material";
import { ChangeEvent } from "react";
import { IAddress, initializeAddressError } from "../../model/user";
import { ETextField } from "./common/ETextField";

interface AddressFormProps {
  selectedAddress: IAddress;
  error?: Record<keyof IAddress, string>;
  onAddressChange: (field: string, value: any) => void;
}

export const AddressForm = ({
  selectedAddress,
  onAddressChange,
  error = initializeAddressError(),
}: AddressFormProps) => {
  const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAddressChange(event.currentTarget.name, event.currentTarget.value);
  };

  return (
    <form>
      <ETextField
        label="First Name"
        name="firstname"
        error={error.firstname}
        value={selectedAddress.firstname}
        onChange={handleAddressChange}
      />
      <ETextField
        label="Last Name"
        name="lastname"
        error={error.lastname}
        value={selectedAddress.lastname}
        onChange={handleAddressChange}
      />
      <ETextField
        label="Phone Number"
        name="phoneNumber"
        error={error.phoneNumber}
        value={selectedAddress.phoneNumber}
        onChange={handleAddressChange}
      />
      <Box display="flex">
        <Box width="100%">
          <ETextField
            label="Steet name"
            name="street"
            error={error.street}
            value={selectedAddress.street}
            onChange={handleAddressChange}
          />
        </Box>
        <Box>
          <ETextField
            label="House no"
            name="houseNumber"
            error={error.houseNumber}
            fullWidth={false}
            value={selectedAddress.houseNumber}
            onChange={handleAddressChange}
          />
        </Box>
      </Box>
      <ETextField
        label="Zip Code"
        name="zipCode"
        error={error.zipCode}
        value={selectedAddress.zipCode}
        onChange={handleAddressChange}
      />
      <ETextField
        label="City"
        name="city"
        error={error.city}
        value={selectedAddress.city}
        onChange={handleAddressChange}
      />
      <ETextField
        label="Country"
        name="country"
        error={error.country}
        value={selectedAddress.country}
        onChange={handleAddressChange}
      />
    </form>
  );
};
