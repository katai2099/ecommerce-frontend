import { Box, Typography } from "@mui/material";
import { IAddress } from "../../model/user";

interface AddressDetailsProps {
  address: IAddress;
}

export const AddressDetails = ({ address }: AddressDetailsProps) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>{`${address.firstname} ${address.lastname}`}</Typography>
      </Box>
      <Box display="flex">
        <Typography>{`${address.street} ${address.houseNumber}`}</Typography>
      </Box>
      <Box display="flex">
        <Typography>{`${address.zipCode} ${address.city}`}</Typography>
      </Box>
      <Typography>{`${address.country}`}</Typography>
      <Typography mt="8px">Phone: {address.phoneNumber}</Typography>
    </Box>
  );
};
