import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  getAddresses,
  setAddressAsDefault,
  updateAddress,
  validateAddress,
} from "../../controllers/user";
import {
  clone,
  isRecordValueEmpty,
  showSnackBar,
} from "../../controllers/utils";
import { Address, IAddress, initializeAddressError } from "../../model/user";
import {
  setAddressDialogOpen,
  setAddresses,
} from "../../reducers/accountReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AddressComponent } from "./AddressComponent";
import { NewAddressDialog } from "./NewAddressDialog";
import { AddressBookSkeletonLoading } from "./SkeletonLoading";

export const AddressBook = () => {
  const accountData = useSelector((state: RootState) => state.account);
  const addresses = accountData.addresses;
  const addressesLoading = accountData.addressesLoading;
  const addressError = accountData.addressesError;
  const [selectedAddress, setSelectedAddress] = useState<IAddress>(
    new Address()
  );
  const addressDialogOpen = accountData.addressDialogOpen;
  const [addressErrorInfo, setAddressErrorInfo] = useState<
    Record<keyof IAddress, string>
  >(initializeAddressError());
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDefaultDisable, setIsDefaultDisable] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    getAddresses()
      .then(() => {})
      .catch((err) => {});
  }, []);
  const handleOnDelete = (deletedAddress: IAddress) => {
    deleteAddress(deletedAddress.id)
      .then(() => {
        let updatedAddresses = addresses.filter(
          (address) => address.id !== deletedAddress.id
        );
        if (deletedAddress.isDefault && updatedAddresses.length > 0) {
          const addressIds = clone(updatedAddresses).map(
            (address) => address.id
          );
          const minId = Math.min(...addressIds);
          updatedAddresses = updatedAddresses.map((address) =>
            address.id === minId ? { ...address, isDefault: true } : address
          );
        }
        dispatch(setAddresses(updatedAddresses));
      })
      .catch(() => {
        showSnackBar("something went wrong", "error");
      });
  };
  const handleOnSetAsDefault = (defaultAddressId: number) => {
    setAddressAsDefault(defaultAddressId)
      .then((res) => {
        const updatedAddresses = addresses.map((address) =>
          address.id === defaultAddressId
            ? { ...address, isDefault: true }
            : { ...address, isDefault: false }
        );
        dispatch(setAddresses(updatedAddresses));

        return Promise.resolve(res);
      })
      .catch((err) => {});
  };
  const handleAddressUpdate = (field: string, value: any) => {
    setSelectedAddress({ ...selectedAddress, [field]: value });
    setAddressErrorInfo({ ...addressErrorInfo, [field]: "" });
  };

  const handleAddressDialogState = (open: boolean) => {
    dispatch(setAddressDialogOpen(open));
  };

  const handleOnSubmit = () => {
    const error = validateAddress(selectedAddress);
    const isAddressEmpty = isRecordValueEmpty(error, ["id", "isDefault"]);
    if (!isAddressEmpty) {
      setAddressErrorInfo(error);
      return;
    }
    if (isEdit) {
      updateAddress(selectedAddress)
        .then(() => {
          let updatedAddresses = [...addresses];
          const updatedAddressIndex = updatedAddresses.findIndex(
            (address) => address.id === selectedAddress.id
          );
          updatedAddresses[updatedAddressIndex] = selectedAddress;
          if (selectedAddress.isDefault) {
            updatedAddresses = updatedAddresses.map((address) => ({
              ...address,
              isDefault: false,
            }));
            updatedAddresses[updatedAddressIndex] = selectedAddress;
          }
          dispatch(setAddresses(updatedAddresses));
        })
        .catch(() => {
          showSnackBar("something went wrong", "error");
        });
    } else {
      addNewAddress(selectedAddress)
        .then((newAddressId) => {
          const newAddress: IAddress = { ...selectedAddress, id: newAddressId };
          let updatedAddresses = [...addresses];
          if (newAddress.isDefault) {
            updatedAddresses = addresses.map((address) => {
              return { ...address, isDefault: false };
            });
          }
          updatedAddresses.push(newAddress);
          dispatch(setAddresses(updatedAddresses));
        })
        .catch(() => {
          showSnackBar("something went wrong", "error");
        });
    }
  };

  const handleAddNewAddress = () => {
    setIsEdit(false);
    prepareAddressForEdit(new Address());
  };

  const handleOnEdit = (address: IAddress) => {
    setIsEdit(true);
    prepareAddressForEdit(address);
  };

  const prepareAddressForEdit = (address: IAddress) => {
    const tmpAddress: IAddress = { ...address };
    setIsDefaultDisable(addresses.length === 0 || address.isDefault);
    tmpAddress.isDefault = addresses.length === 0 ? true : tmpAddress.isDefault;
    setSelectedAddress(tmpAddress);
    setAddressErrorInfo(initializeAddressError());
    handleAddressDialogState(true);
  };

  return (
    <Paper sx={{ padding: "16px 32px 32px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="24px"
      >
        <Typography variant="h3">Address Book</Typography>
        {!addressesLoading && !addressError && (
          <Button
            variant="outlined"
            onClick={handleAddNewAddress}
            startIcon={<Add />}
          >
            Add new Address
          </Button>
        )}
      </Box>
      <NewAddressDialog
        open={addressDialogOpen}
        isEdit={isEdit}
        selectedAddress={selectedAddress}
        handleDialogState={handleAddressDialogState}
        onAddressChange={handleAddressUpdate}
        onSubmit={handleOnSubmit}
        disableDefault={isDefaultDisable}
        addressError={addressErrorInfo}
      />
      {addressesLoading ? (
        <AddressBookSkeletonLoading />
      ) : (
        <>
          {addresses.length === 0 ? (
            <Typography variant="h3" textAlign="center">
              No active address
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {addresses.map((address, idx) => (
                <Grid item xs={12} sm={6} key={address.id}>
                  <AddressComponent
                    address={address}
                    onDelete={handleOnDelete}
                    onSetAsDefault={handleOnSetAsDefault}
                    onEdit={handleOnEdit}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Paper>
  );
};
