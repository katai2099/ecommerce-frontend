import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Snackbar,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getProductAction } from "../../actions/productActions";
import { LoadingButton } from "../../client/components/common/LoadingButton";
import { addNewProduct, setProductSizes } from "../../controllers/product";
import { Gender, IProduct, ProductMode } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  resetProductState,
  setEditedProduct,
  setProductMode,
  setSelectedProduct,
} from "../../reducers/productReducer";
import { useAppDispatch } from "../../store/configureStore";
import { ProductStock } from "../components/product/ProductStock";
import { UploadImageSection } from "../components/product/UploadImageSection";

export const Product = () => {
  const adminSettings = useSelector((state: RootState) => state.admin);
  const product = useSelector((state: RootState) => state.product);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mode = product.mode;
  const editedProduct = product.editedProduct;
  const selectedProduct = product.selectedProduct;

  useEffect(() => {
    if (location.state !== null) {
      dispatch(getProductAction(location.state))
        .unwrap()
        .then((res) => {
          dispatch(setEditedProduct(res));
          dispatch(setSelectedProduct(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const [files, setFiles] = useState<File[]>([]);

  const updateProduct = (field: string, value: any) => {
    const product: IProduct = { ...editedProduct, [field]: value };
    dispatch(setEditedProduct(product));
  };

  const handleSubmit = () => {
    //TODO: validate data
    addNewProduct(editedProduct, files);
  };

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

  const onCancelClickHandler = () => {
    dispatch(setEditedProduct(selectedProduct));
    dispatch(setProductMode(ProductMode.VIEW));
  };

  useEffect(() => {
    if (mode === ProductMode.CREATE) {
      setProductSizes(adminSettings.sizes, editedProduct);
    }
  }, []);

  const productSizes =
    mode === ProductMode.CREATE
      ? adminSettings.sizes
      : selectedProduct.productSizes;

  function handleImageDrop(file: File): void {
    setFiles((previous: File[]) => [...previous, file]);
  }

  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="24px"
        >
          <Typography variant="h3">
            {mode === ProductMode.CREATE
              ? "Add New Product"
              : selectedProduct.name}
          </Typography>
          <IconButton
            onClick={() => {
              dispatch(resetProductState());
              navigate("/admin/product", { replace: true });
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box component="form">
          <Grid container spacing={2}>
            <Grid item lg={6}>
              <Paper>
                <Grid container padding="32px">
                  <Grid item lg={12}>
                    {/* <ProductOutlinedInput editMode={false} /> */}
                    <FormControl fullWidth>
                      <FormLabel>Product Name</FormLabel>
                      <OutlinedInput
                        value={editedProduct.name}
                        fullWidth
                        // error
                        disabled={mode === ProductMode.VIEW}
                        required
                        placeholder="Name"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          updateProduct("name", event.currentTarget.value);
                        }}
                      />
                      {/* <FormHelperText>required</FormHelperText> */}
                    </FormControl>
                  </Grid>

                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <FormLabel>Category</FormLabel>
                      <InputLabel></InputLabel>
                      <Select
                        value={editedProduct.category.id.toString()}
                        disabled={mode === ProductMode.VIEW}
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
                          <MenuItem value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {/* <FormHelperText>required</FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item lg={6}>
                      <FormControl fullWidth>
                        <FormLabel>Price</FormLabel>
                        <OutlinedInput
                          type="number"
                          fullWidth
                          value={editedProduct.price}
                          // error
                          disabled={mode === ProductMode.VIEW}
                          required
                          inputProps={{ min: 0 }}
                          onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            updateProduct(
                              "price",
                              Number(event.currentTarget.value)
                            );
                          }}
                        />
                        {/* <FormHelperText>required</FormHelperText> */}
                      </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                      <FormControl fullWidth>
                        <FormLabel>Gender</FormLabel>
                        <ToggleButtonGroup
                          color="primary"
                          value={editedProduct.gender}
                          exclusive
                          onChange={(_event, newAlignment: string) => {
                            updateProduct("gender", newAlignment);
                          }}
                        >
                          <ToggleButton
                            disabled={mode === ProductMode.VIEW}
                            value={Gender.MEN}
                          >
                            MEN
                          </ToggleButton>
                          <ToggleButton
                            disabled={mode === ProductMode.VIEW}
                            value={Gender.WOMEN}
                          >
                            Women
                          </ToggleButton>
                        </ToggleButtonGroup>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid item lg={12}>
                    <FormControl fullWidth>
                      <FormLabel>Description</FormLabel>
                      <OutlinedInput
                        fullWidth
                        disabled={mode === ProductMode.VIEW}
                        // error
                        required
                        placeholder="Description"
                        multiline
                        rows={7}
                        value={editedProduct.description}
                        onChange={(event) => {
                          updateProduct(
                            "description",
                            event.currentTarget.value
                          );
                        }}
                      />
                      {/* <FormHelperText>required</FormHelperText> */}
                    </FormControl>
                  </Grid>
                  <Grid item lg={12}>
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <Box className="flex-grow">Size</Box>
                      <Box className="flex-grow">Stock count</Box>
                    </Box>
                    {productSizes.map((_size, idx) => (
                      <ProductStock
                        idx={idx}
                        editedProduct={editedProduct}
                        mode={mode}
                      />
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item lg={6}>
              <Paper>
                <Grid container padding="32px">
                  <UploadImageSection
                    onImageDrop={handleImageDrop}
                    files={files}
                    onLocalImageDelete={onLocalImageDeleteHandle}
                    onRemoteImageDelete={onRemoteImageDeleteHandle}
                    mode={mode}
                  />
                </Grid>
              </Paper>
              <Box
                display="flex"
                width="100%"
                justifyContent="flex-end"
                gap="8px"
                mt="24px"
              >
                {mode === ProductMode.EDIT && (
                  // <Box textAlign="right" mt="24px">
                  <Button variant="outlined" onClick={onCancelClickHandler}>
                    Cancel
                  </Button>
                  // </Box>
                )}
                {mode !== ProductMode.VIEW && (
                  // <Box textAlign="right" mt="24px">
                  <LoadingButton
                    loading={product.submitData}
                    title={"Add Product"}
                    onClick={handleSubmit}
                  />
                  // </Box>
                )}
              </Box>
              <Snackbar
                open={true}
                autoHideDuration={3000}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Alert
                  variant="filled"
                  elevation={6}
                  onClose={() => {}}
                  severity="success"
                >
                  Successfully Created
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
