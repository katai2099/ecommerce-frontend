import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addAddressAction,
  deleteAddressAction,
  getAddressesAction,
  updateAddressAction,
} from "../../actions/userActions";
import { setAddressAsDefault } from "../../controllers/user";
import { clone } from "../../controllers/utils";
import { Address, IAddress } from "../../model/user";
import { useAppDispatch } from "../../store/configureStore";
import { AddressComponent } from "./AddressComponent";
import { NewAddressDialog } from "./NewAddressDialog";

export const AddressBook = () => {
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<IAddress>(
    new Address()
  );
  const [isAddressDialogOpen, setIsAddressDialogOpen] =
    useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isDefaultDisable, setIsDefaultDisable] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAddressesAction())
      .unwrap()
      .then((res) => setAddresses(res))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleOnDelete = (deletedAddress: IAddress) => {
    dispatch(deleteAddressAction(deletedAddress.id))
      .unwrap()
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
        setAddresses(updatedAddresses);
      })
      .catch((err) => {
        console.log(err);
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
        setAddresses(updatedAddresses);
        return Promise.resolve(res);
      })
      .catch((err) => console.log(err));
  };
  const handleAddressUpdate = (field: string, value: any) => {
    setSelectedAddress({ ...selectedAddress, [field]: value });
  };

  const handleAddressDialogState = (open: boolean) => {
    setIsAddressDialogOpen(open);
  };

  const handleOnSubmit = () => {
    if (isEdit) {
      dispatch(updateAddressAction(selectedAddress))
        .unwrap()
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
          setAddresses(updatedAddresses);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsAddressDialogOpen(false);
        });
    } else {
      dispatch(addAddressAction(selectedAddress))
        .unwrap()
        .then((newAddressId) => {
          const newAddress: IAddress = { ...selectedAddress, id: newAddressId };
          let updatedAddresses = [...addresses];
          if (newAddress.isDefault) {
            updatedAddresses = addresses.map((address) => {
              return { ...address, isDefault: false };
            });
          }
          updatedAddresses.push(newAddress);
          setAddresses(updatedAddresses);
        })
        .finally(() => {
          setIsAddressDialogOpen(false);
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
    setIsAddressDialogOpen(true);
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
        <Button
          variant="outlined"
          onClick={handleAddNewAddress}
          startIcon={<Add />}
          // sx={{
          //   "&:hover": {
          //     backgroundColor: "black",
          //     color: "white",
          //   },
          // }}
        >
          Add new Address
        </Button>
      </Box>
      <NewAddressDialog
        open={isAddressDialogOpen}
        isEdit={isEdit}
        selectedAddress={selectedAddress}
        handleDialogState={handleAddressDialogState}
        onAddressChange={handleAddressUpdate}
        onSubmit={handleOnSubmit}
        disableDefault={isDefaultDisable}
      />
      <Grid container spacing={3}>
        {addresses.map((address, idx) => (
          <Grid item md={6} key={address.id}>
            <AddressComponent
              address={address}
              onDelete={handleOnDelete}
              onSetAsDefault={handleOnSetAsDefault}
              onEdit={handleOnEdit}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};
