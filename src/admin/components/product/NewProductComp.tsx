import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ETextField } from "../../../client/components/common/ETextField";
import { IProduct } from "../../../model/product";
import { RootState } from "../../../reducers/combineReducer";
import { setEditedProduct } from "../../../reducers/productReducer";
import { useAppDispatch } from "../../../store/configureStore";
import Title from "../Title";
import { UploadImageSection } from "./UploadImageSection";

export const NewProductDetails = () => {
  const product = useSelector((state: RootState) => state.product);
  const editedProduct = product.editedProduct;
  const dispatch = useAppDispatch();

  const updateProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const product: IProduct = {
      ...editedProduct,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    dispatch(setEditedProduct(product));
  };

  const [files, setFiles] = useState<File[]>([]);
  function onLocalImageDeleteHandle(idx: number): void {
    setFiles((prevFiles) => {
      return prevFiles.filter((_, index) => index !== idx);
    });
  }
  const onRemoteImageDeleteHandle = (idx: number) => {
    const images = editedProduct.images.filter((_, index) => index !== idx);
    const product: IProduct = { ...editedProduct, images: images };
    dispatch(setEditedProduct(product));
  };
  function handleImageDrop(file: File): void {
    setFiles((previous: File[]) => [...previous, file]);
  }

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
            onChange={updateProduct}
          />
          <ETextField
            label="Description"
            name="description"
            value={editedProduct.description}
            onChange={updateProduct}
          />
          <UploadImageSection
            onImageDrop={handleImageDrop}
            files={files}
            onLocalImageDelete={onLocalImageDeleteHandle}
            onRemoteImageDelete={onRemoteImageDeleteHandle}
            mode={product.mode}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export const NewProductProperties = () => {
  const product = useSelector((state: RootState) => state.product);
  const editedProduct = product.editedProduct;
  const adminSettings = useSelector((state: RootState) => state.admin);

  const dispatch = useAppDispatch();

  const updateProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const product: IProduct = {
      ...editedProduct,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    dispatch(setEditedProduct(product));
  };

  const updateProductByName = (name: string, value: any) => {
    const product: IProduct = {
      ...editedProduct,
      [name]: value,
    };
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
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={editedProduct.category.id.toString()}
                //   disabled={mode === ProductMode.VIEW}
                onChange={(event: SelectChangeEvent) => {
                  updateProductByName(
                    "category",
                    adminSettings.categories.find(
                      (cat) => cat.id === Number(event.target.value)
                    )
                  );
                }}
              >
                {adminSettings.categories.map((category) => (
                  <MenuItem value={category.id}>{category.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb="16px">
            <FormControl fullWidth>
              <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                placeholder="0.00"
                label="Price"
                type="number"
                inputProps={{ min: 0 }}
              />
            </FormControl>
          </Box>
          <Box mb="16px">
            <Typography fontWeight="bold">Gender</Typography>
            <FormGroup row>
              <FormControlLabel control={<Checkbox />} label="MEN" />
              <FormControlLabel control={<Checkbox />} label="WOMEN" />
            </FormGroup>
          </Box>
          <Box mb="16px">
            <Box display="flex" alignItems="center" gap="48px">
              <Typography fontWeight="bold">Sizes</Typography>
              <IconButton color="primary">
                <Add />
              </IconButton>
            </Box>

            <Box display="flex" alignItems="center" my="8px" gap="8px">
              <Box width="50%">
                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select
                    label="Size"
                    // value={editedProduct.category.id.toString()}
                    //   disabled={mode === ProductMode.VIEW}
                    onChange={(event: SelectChangeEvent) => {
                      updateProductByName(
                        "category",
                        adminSettings.categories.find(
                          (cat) => cat.id === Number(event.target.value)
                        )
                      );
                    }}
                  >
                    {adminSettings.sizes.map((size) => (
                      <MenuItem value={size.id}>{size.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box display="flex" alignItems="center" gap="16px" width="50%">
                <Typography color="GrayText">Quantity</Typography>
                <OutlinedInput
                  fullWidth
                  type="number"
                  required
                  inputProps={{ min: 0 }}
                />
              </Box>
              <Button
                sx={{
                  textTransform: "none",
                  textDecoration: "underline",
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Remove
              </Button>
            </Box>
          </Box>
        </Stack>
      </Grid>
      <Dialog
        open={false}
        //   onClose={}
      >
        <DialogTitle>Select Size</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" my="8px" gap="8px">
            <Box width="50%">
              <FormControl fullWidth>
                <InputLabel>Size</InputLabel>
                <Select
                  label="Size"
                  // value={editedProduct.category.id.toString()}
                  //   disabled={mode === ProductMode.VIEW}
                  onChange={(event: SelectChangeEvent) => {
                    updateProductByName(
                      "category",
                      adminSettings.categories.find(
                        (cat) => cat.id === Number(event.target.value)
                      )
                    );
                  }}
                >
                  {adminSettings.sizes.map((size) => (
                    <MenuItem value={size.id}>{size.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center" gap="16px" width="50%">
              <Typography color="GrayText">Quantity</Typography>
              <OutlinedInput
                fullWidth
                type="number"
                required
                inputProps={{ min: 0 }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            // onClick={}
            color="primary"
          >
            Cancel
          </Button>
          <Button variant="contained">Ok</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
