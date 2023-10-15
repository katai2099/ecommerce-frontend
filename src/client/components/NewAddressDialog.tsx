import { Close } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
} from "@mui/material";
import { SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import { IAddress } from "../../model/user";
import { RootState } from "../../reducers/combineReducer";
import { AddressForm } from "./AddressForm";
import { LoadingButton } from "./common/LoadingButton";

interface NewAddressDialogProps {
  isEdit?: boolean;
  selectedAddress: IAddress;
  disableDefault: boolean;
  onAddressChange: (field: string, value: any) => void;
  onSubmit: () => void;
  addressError: Record<keyof IAddress, string>;
}

export interface DialogProps {
  open: boolean;
  handleDialogState: (open: boolean) => void;
}

export const NewAddressDialog = ({
  open,
  isEdit = false,
  selectedAddress,
  disableDefault,
  handleDialogState,
  onAddressChange,
  onSubmit,
  addressError,
}: NewAddressDialogProps & DialogProps) => {
  const handleAddressUpdate = (field: string, value: any) => {
    onAddressChange(field, value);
  };

  const addressLoading = useSelector(
    (state: RootState) => state.account.addressesLoading
  );

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDialogState(false);
      }}
    >
      <DialogTitle>{isEdit ? "Edit address" : "Add new address"}</DialogTitle>
      <IconButton
        disabled={addressLoading}
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
        <Box>
          <AddressForm
            selectedAddress={selectedAddress}
            onAddressChange={handleAddressUpdate}
            error={addressError}
          />
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
          <LoadingButton
            fullWidth
            onClick={() => {
              onSubmit();
            }}
            title={isEdit ? "Update Address" : "Save Address"}
            loading={addressLoading}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
