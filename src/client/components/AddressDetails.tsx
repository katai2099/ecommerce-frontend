import { Box, Typography } from "@mui/material";
import { IAddress } from "../../model/user";

interface AddressDetailsProps {
  address: IAddress;
  gray?: boolean;
}

export const AddressDetails = ({
  address,
  gray = false,
}: AddressDetailsProps) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography
          color={gray ? "GrayText" : "primary"}
        >{`${address.firstname} ${address.lastname}`}</Typography>
      </Box>
      <Box display="flex">
        <Typography
          color={gray ? "GrayText" : "primary"}
        >{`${address.street} ${address.houseNumber}`}</Typography>
      </Box>
      <Box display="flex">
        <Typography
          color={gray ? "GrayText" : "primary"}
        >{`${address.zipCode} ${address.city}`}</Typography>
      </Box>
      <Typography
        color={gray ? "GrayText" : "primary"}
      >{`${address.country}`}</Typography>
      <Typography mt="8px" color={gray ? "GrayText" : "primary"}>
        Phone: {address.phoneNumber}
      </Typography>
    </Box>
  );
};
