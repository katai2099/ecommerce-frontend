import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IAddress } from "../../model/user";
import {
  resetBillingAddressError,
  resetDeliveryAddressError,
  setAddressBookDialogOpen,
  setBillingAddress,
  setBillingAddressError,
  setDeliveryAddress,
  setDeliveryAddressError,
  setFirstLoadToFalse,
  setIsBillingSameAsDelivery,
  setIsNewBillingAddress,
  setIsNewDeliveryAddress,
  setSelectedBillingAddressIndex,
  setSelectedDeliveryAddressIndex,
} from "../../reducers/checkoutReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AddressBookDialog } from "./AddressBookDialog";
import { AddressDetails } from "./AddressDetails";
import { AddressForm } from "./AddressForm";

export const CheckoutAddress = () => {
  const dispatch = useAppDispatch();
  const checkoutInfo = useSelector((state: RootState) => state.checkout);
  const deliveryAddress = checkoutInfo.deliveryAddress;
  const billingAddress = checkoutInfo.billingAddress;
  const isBillingSameAsDelivery = checkoutInfo.isBillingSameAsDelivery;
  const selectedDeliveryAddressIndex =
    checkoutInfo.selectedDeliveryAddressIndex;
  const selectedBillingAddressIndex = checkoutInfo.selectedBillingAddressIndex;
  const userAddresess = checkoutInfo.addresses;
  const isAddressBookDialogOpen = checkoutInfo.addressBookDialogOpen;
  const isNewDeliveryAddress = checkoutInfo.isNewDeliveryAddress;
  const isNewBillingAddress = checkoutInfo.isNewBillingAddress;

  const [isDeliveryAddressSelect, setIsDeliveryAddressSelect] =
    useState<boolean>(true);

  useEffect(() => {
    if (checkoutInfo.firstLoad) {
      const defaultAddressIdx = userAddresess.findIndex(
        (address) => address.isDefault
      );
      dispatch(setSelectedDeliveryAddressIndex(defaultAddressIdx));
      dispatch(setSelectedBillingAddressIndex(defaultAddressIdx));
      dispatch(setFirstLoadToFalse());
    }
  }, [checkoutInfo.firstLoad]);

  const handleIsBillingSameAsDeliveryUpdate = (value: boolean) => {
    dispatch(setIsBillingSameAsDelivery(value));
  };
  const handleDeliveryAddressChange = (field: string, value: any) => {
    const updateDeliveryAddressError: Record<keyof IAddress, string> = {
      ...checkoutInfo.deliveryAddressError,
      [field]: "",
    };
    const updatedDeliveryAddress: IAddress = {
      ...deliveryAddress,
      [field]: value,
    };
    dispatch(setDeliveryAddressError(updateDeliveryAddressError));
    dispatch(setDeliveryAddress(updatedDeliveryAddress));
  };

  const handleBillingAddressChange = (field: string, value: any) => {
    const updateBillingAddressError: Record<keyof IAddress, string> = {
      ...checkoutInfo.billingAddressError,
      [field]: "",
    };
    const updatedBillingAddress: IAddress = {
      ...billingAddress,
      [field]: value,
    };
    dispatch(setBillingAddressError(updateBillingAddressError));
    dispatch(setBillingAddress(updatedBillingAddress));
  };

  const handleAddressDialogStateUpdate = (state: boolean) => {
    dispatch(setAddressBookDialogOpen(state));
  };

  return (
    <Box>
      <Typography variant="h3" mb="8px">
        1. Delivery
      </Typography>

      <Paper sx={{ padding: "16px 20px 8px", mb: "32px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="16px"
        >
          <Typography variant="h3">Delivery Address</Typography>
          {isNewDeliveryAddress && (
            <Button
              variant="outlined"
              onClick={() => {
                setIsDeliveryAddressSelect(true);
                dispatch(setSelectedDeliveryAddressIndex(-1));
                handleAddressDialogStateUpdate(true);
              }}
            >
              Select from address book
            </Button>
          )}
        </Box>
        {selectedDeliveryAddressIndex !== -1 && !isNewDeliveryAddress && (
          <Box display="flex" justifyContent="space-between">
            <AddressDetails
              address={userAddresess[selectedDeliveryAddressIndex]}
            />
            <Box
              display="flex"
              flexDirection="column"
              alignSelf="end"
              mb="8px"
              mr="8px"
              gap="8px"
            >
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(resetDeliveryAddressError());
                  dispatch(setIsNewDeliveryAddress(true));
                }}
              >
                New Address
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setIsDeliveryAddressSelect(true);
                  handleAddressDialogStateUpdate(true);
                }}
              >
                Change
              </Button>
            </Box>
          </Box>
        )}
        {(userAddresess.length === 0 || isNewDeliveryAddress) && (
          <AddressForm
            selectedAddress={deliveryAddress}
            onAddressChange={handleDeliveryAddressChange}
            error={checkoutInfo.deliveryAddressError}
          />
        )}
      </Paper>
      <Paper sx={{ padding: "16px 20px 8px", mb: "32px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="16px"
        >
          <Typography variant="h3">Billing Address</Typography>
          {isNewBillingAddress && (
            <Button
              variant="outlined"
              onClick={() => {
                setIsDeliveryAddressSelect(false);
                dispatch(setSelectedBillingAddressIndex(-1));
                handleAddressDialogStateUpdate(true);
              }}
            >
              Select from address book
            </Button>
          )}
        </Box>
        <Box mb="16px">
          <FormGroup>
            <FormControlLabel
              onChange={(event: SyntheticEvent, value: boolean) => {
                handleIsBillingSameAsDeliveryUpdate(value);
                dispatch(setIsNewBillingAddress(false));
              }}
              checked={isBillingSameAsDelivery}
              control={<Checkbox size="medium" />}
              label="Use the delivery address as billing address"
            />
          </FormGroup>
        </Box>
        {!isBillingSameAsDelivery &&
          selectedBillingAddressIndex !== -1 &&
          !isNewBillingAddress && (
            <Box display="flex" justifyContent="space-between">
              <AddressDetails
                address={userAddresess[selectedBillingAddressIndex]}
              />
              <Box
                display="flex"
                flexDirection="column"
                alignSelf="end"
                mb="8px"
                mr="8px"
                gap="8px"
              >
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsDeliveryAddressSelect(false);
                    dispatch(resetBillingAddressError());
                    dispatch(setIsNewBillingAddress(true));
                  }}
                >
                  New Address
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    setIsDeliveryAddressSelect(false);
                    handleAddressDialogStateUpdate(true);
                  }}
                >
                  Change
                </Button>
              </Box>
            </Box>
          )}
        {(userAddresess.length === 0 || isNewBillingAddress) && (
          <AddressForm
            selectedAddress={billingAddress}
            onAddressChange={handleBillingAddressChange}
            error={checkoutInfo.billingAddressError}
          />
        )}
        <AddressBookDialog
          isDeliveryAddressSelect={isDeliveryAddressSelect}
          open={isAddressBookDialogOpen}
          handleDialogState={handleAddressDialogStateUpdate}
        />
      </Paper>
    </Box>
  );
};
