import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DialogProps } from "../../../client/components/NewAddressDialog";
import { ETextField } from "../../../client/components/common/ETextField";
import { IIdName } from "../../../model/common";
import {
  Gender,
  IProduct,
  IProductSize,
  ProductMode,
} from "../../../model/product";
import { RootState } from "../../../reducers/combineReducer";
import { setEditedProduct } from "../../../reducers/productReducer";
import { useAppDispatch } from "../../../store/configureStore";
import Title from "../Title";
import { ProductStock } from "./ProductStock";
import { UploadImageSection } from "./UploadImageSection";

interface NewProductProps {
  editedProduct: IProduct;
  updateProduct(name: string, value: any): void;
  mode: ProductMode;
}

interface NewProductDetailProps {
  onLocalImageDelete(idx: number): void;
  onImageDrop(file: File): void;
  files: File[];
}

export const NewProductDetails = ({
  editedProduct,
  updateProduct,
  mode,
  onLocalImageDelete,
  onImageDrop,
  files,
}: NewProductProps & NewProductDetailProps) => {
  const dispatch = useAppDispatch();
  const handleUpdateProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateProduct(event.currentTarget.name, event.currentTarget.value);
  };
  function hanldeLocalImageDelete(idx: number): void {
    onLocalImageDelete(idx);
  }
  const onRemoteImageDeleteHandle = (idx: number) => {
    const images = editedProduct.images.filter((_, index) => index !== idx);
    const product: IProduct = { ...editedProduct, images: images };
    dispatch(setEditedProduct(product));
  };
  const disable = mode === ProductMode.VIEW;
  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Title bold>Details</Title>
        <Typography color="GrayText">Title, Description, images...</Typography>
      </Grid>
      <Grid item md={8}>
        <Stack padding="24px 24px 24px 0">
          <ETextField
            label="Product Name"
            name="name"
            value={editedProduct.name}
            disable={disable}
            onChange={handleUpdateProduct}
          />
          <ETextField
            label="Description"
            name="description"
            multiline
            value={editedProduct.description}
            disable={disable}
            onChange={handleUpdateProduct}
          />
          <UploadImageSection
            onImageDrop={onImageDrop}
            files={files}
            onLocalImageDelete={hanldeLocalImageDelete}
            onRemoteImageDelete={onRemoteImageDeleteHandle}
            mode={mode}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export const NewProductProperties = ({
  editedProduct,
  updateProduct,
  mode,
}: NewProductProps) => {
  const adminSettings = useSelector((state: RootState) => state.admin);
  const [sizeDialogOpen, setSizeDialogOpen] = useState<boolean>(false);
  const disable = mode === ProductMode.VIEW;
  const handleDialogState = (state: boolean) => {
    setSizeDialogOpen(state);
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Title bold>Properties</Title>
        <Typography color="GrayText">
          Additional functions and attributes...
        </Typography>
      </Grid>
      <Grid item md={8}>
        <Stack padding="24px 24px 24px 0">
          <Box mb="16px">
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={editedProduct.category.id.toString()}
                disabled={disable}
                onChange={(event: SelectChangeEvent) => {
                  updateProduct(
                    "category",
                    adminSettings.categories.find(
                      (cat) => cat.id === Number(event.target.value)
                    )
                  );
                }}
              >
                {adminSettings.categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb="16px">
            <FormControl fullWidth required>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                disabled={disable}
                name="price"
                value={editedProduct.price}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                placeholder="0.00"
                label="Price"
                type="number"
                inputProps={{ min: 0 }}
                onChange={(event) => {
                  updateProduct(
                    event.currentTarget.name,
                    Number(event.currentTarget.value)
                  );
                }}
              />
            </FormControl>
          </Box>
          <Box mb="16px">
            <Typography fontWeight="bold" mb="8px">
              Gender
            </Typography>
            <FormControl fullWidth>
              <ToggleButtonGroup
                color="primary"
                value={editedProduct.gender}
                exclusive
                onChange={(_event, newAlignment: string) => {
                  updateProduct("gender", newAlignment);
                }}
              >
                <ToggleButton disabled={disable} value={Gender.MEN}>
                  MEN
                </ToggleButton>
                <ToggleButton disabled={disable} value={Gender.WOMEN}>
                  Women
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Box>
          <Box mb="16px">
            <Box display="flex" alignItems="center" gap="48px">
              <Typography fontWeight="bold">Sizes *</Typography>
              <IconButton
                disabled={
                  adminSettings.sizes.length ===
                    editedProduct.productSizes.length || disable
                }
                color="primary"
                onClick={() => {
                  setSizeDialogOpen(true);
                }}
              >
                <Add />
              </IconButton>
            </Box>
            {editedProduct.productSizes.map((_, idx) => (
              <ProductStock
                key={idx}
                idx={idx}
                editedProduct={editedProduct}
                mode={mode}
              />
            ))}
          </Box>
        </Stack>
        {sizeDialogOpen && (
          <NewSizeDialog
            open={sizeDialogOpen}
            handleDialogState={handleDialogState}
            sizes={adminSettings.sizes}
            editedProduct={editedProduct}
          />
        )}
      </Grid>
    </Grid>
  );
};

interface NewSizeDialogProps {
  sizes: IIdName[];
  editedProduct: IProduct;
}

const NewSizeDialog = ({
  open,
  handleDialogState,
  editedProduct,
  sizes,
}: DialogProps & NewSizeDialogProps) => {
  const [sizeId, setSizeId] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(10);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const productSizeSizes = editedProduct.productSizes.map(
      (productSize) => productSize.size
    );

    const unselectedSizes = sizes.filter(
      (size) =>
        productSizeSizes.findIndex(
          (productSize) => productSize.id === size.id
        ) === -1
    );
    if (unselectedSizes.length !== 0) {
      setSizeId(unselectedSizes[0].id);
    }
  }, []);

  const handleAdd = () => {
    if (sizeId === 0) {
      setSizeError(true);
      return;
    }
    if (quantity === 0) {
      setQuantityError(true);
      return;
    }
    const selectedSize = sizes.find((elem) => elem.id === sizeId);
    const productSize: IProductSize = {
      id: 0,
      stockCount: quantity,
      size: selectedSize!,
    };
    dispatch(
      setEditedProduct({
        ...editedProduct,
        productSizes: [...editedProduct.productSizes, productSize],
      })
    );
    handleDialogState(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDialogState(false);
      }}
    >
      <DialogTitle>Select Size</DialogTitle>
      <IconButton
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={() => {
          handleDialogState(false);
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Box display="flex" alignItems="center" my="8px" gap="8px">
          <Box width="50%">
            <FormControl fullWidth error={sizeError}>
              <InputLabel>Size</InputLabel>
              <Select
                label="Size"
                value={sizeId}
                onChange={(event) => {
                  setSizeError(false);
                  setSizeId(Number(event.target.value));
                }}
              >
                {sizes.map((size) => (
                  <MenuItem
                    key={size.id}
                    value={size.id}
                    disabled={
                      editedProduct.productSizes.findIndex(
                        (element) => element.size.id === size.id
                      ) !== -1
                    }
                  >
                    {size.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" gap="16px" width="50%">
            <Typography color="GrayText">Quantity</Typography>
            <OutlinedInput
              error={quantityError}
              value={quantity}
              fullWidth
              type="number"
              required
              inputProps={{ min: 0 }}
              onChange={(event) => {
                setQuantityError(false);
                setQuantity(Number(event.currentTarget.value));
              }}
            />
          </Box>
        </Box>
        {sizeError && (
          <Typography color="error" fontSize="12px">
            Size is required
          </Typography>
        )}
        {quantityError && (
          <Typography color="error" fontSize="12px">
            Quantity cannot be 0
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleDialogState(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button variant="contained" onClick={handleAdd}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
