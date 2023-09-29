import {
  Close,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { Box, Checkbox, IconButton, Paper } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { grey } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { IAddress } from "../../model/user";
import {
  setIsNewBillingAddress,
  setIsNewDeliveryAddress,
  setSelectedBillingAddressIndex,
  setSelectedDeliveryAddressIndex,
} from "../../reducers/checkoutReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AddressDetails } from "./AddressDetails";
import { DialogProps } from "./NewAddressDialog";

interface AddressSelectProps {
  idx: number;
  selectedIndex: number;
  address: IAddress;
}

const AddressSelect = ({
  address,
  idx,
  selectedIndex,
  isDeliveryAddressSelect,
}: AddressSelectProps & AddressBookDialogProps) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (isDeliveryAddressSelect) {
      dispatch(setSelectedDeliveryAddressIndex(idx));
      dispatch(setIsNewDeliveryAddress(false));
    } else {
      dispatch(setSelectedBillingAddressIndex(idx));
      dispatch(setIsNewBillingAddress(false));
    }
  };
  return (
    <Paper>
      <Box
        display="flex"
        alignItems="flex-start"
        padding="8px 4px"
        gap="8px"
        mt="10px"
        border={`1px solid ${grey[400]}`}
        borderRadius="4px"
        onClick={handleClick}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Checkbox
          icon={<RadioButtonUnchecked />}
          checkedIcon={<RadioButtonChecked />}
          checked={idx === selectedIndex}
        />
        <AddressDetails address={address} />
      </Box>
    </Paper>
  );
};

interface AddressBookDialogProps {
  isDeliveryAddressSelect: boolean;
}

export const AddressBookDialog = ({
  open,
  handleDialogState,

  isDeliveryAddressSelect = true,
}: DialogProps & AddressBookDialogProps) => {
  const checkoutInfo = useSelector((state: RootState) => state.checkout);
  const addresses = checkoutInfo.addresses;
  const selectedDeliveryAddressIndex =
    checkoutInfo.selectedDeliveryAddressIndex;
  const selectedBillingAddressIndex = checkoutInfo.selectedBillingAddressIndex;

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDialogState(false);
      }}
    >
      <DialogTitle>Address Book</DialogTitle>
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
      <DialogContent>
        <Box minWidth={{ lg: "450px" }}>
          {addresses.map((address, idx) => (
            <AddressSelect
              address={address}
              idx={idx}
              selectedIndex={
                isDeliveryAddressSelect
                  ? selectedDeliveryAddressIndex
                  : selectedBillingAddressIndex
              }
              isDeliveryAddressSelect={isDeliveryAddressSelect}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
