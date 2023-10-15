import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { IAddress } from "../../model/user";

interface AddressProps {
  address: IAddress;
  onDelete: (address: IAddress) => void;
  onSetAsDefault: (addressId: number) => void;
  onEdit: (address: IAddress) => void;
}

export const AddressComponent = ({
  onDelete,
  address,
  onSetAsDefault,
  onEdit,
}: AddressProps) => {
  return (
    <Paper
      sx={{
        borderRadius: "8px",
        border: "1px solid #e3e9f7",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box padding="16px 32px 8px 32px">
        <Box display="flex" justifyContent="space-between">
          <Typography>{`${address.firstname} ${address.lastname}`}</Typography>
          <Box>
            {address.isDefault ? (
              <Chip
                label="Default Address"
                color="success"
                sx={{ height: "18px", fontWeight: "bold" }}
              />
            ) : (
              <Chip
                label="Set as Default"
                color="primary"
                variant="outlined"
                sx={{ height: "18px", fontWeight: "bold" }}
                onClick={() => {
                  onSetAsDefault(address.id);
                }}
              />
            )}
          </Box>
        </Box>
        <Box display="flex">
          <Typography>{address.street}&nbsp;</Typography>
          <Typography>{address.houseNumber}</Typography>
        </Box>
        <Box display="flex">
          <Typography>{address.zipCode}&nbsp;</Typography>
          <Typography>{address.city}</Typography>
        </Box>
        <Typography>{address.country}</Typography>
        <Typography mt="8px">Phone: {address.phoneNumber}</Typography>

        <Box display="flex" justifyContent="space-between" mt="24px">
          <Button
            startIcon={
              <Edit sx={{ fontSize: "15px !important", mr: "-4px " }} />
            }
            sx={{ textDecoration: "underline" }}
            onClick={() => {
              onEdit(address);
            }}
          >
            Edit
          </Button>
          <Button
            startIcon={
              <Delete sx={{ fontSize: "15px !important", mr: "-4px " }} />
            }
            sx={{ textDecoration: "underline" }}
            onClick={() => {
              onDelete(address);
            }}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
