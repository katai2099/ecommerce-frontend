import { Close, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "../../client/components/common/LoadingButton";
import {
  addNewProduct,
  getProduct,
  updateProductCont,
  validateNewProduct,
} from "../../controllers/product";
import { IProduct, NewProductError, ProductMode } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  resetProductState,
  setEditedProduct,
  setNewProductError,
  setProductMode,
  setSelectedProduct,
} from "../../reducers/productReducer";
import { useAppDispatch } from "../../store/configureStore";
import {
  NewProductDetails,
  NewProductProperties,
} from "../components/product/NewProductComp";

export const Product = () => {
  const product = useSelector((state: RootState) => state.product);
  const [files, setFiles] = useState<File[]>([]);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const mode = product.mode;
  const editedProduct = product.editedProduct;
  const selectedProduct = product.selectedProduct;

  useEffect(() => {
    if (location.state !== null) {
      getProduct(location.state)
        .then((res) => {
          dispatch(setEditedProduct(res));
          dispatch(setSelectedProduct(res));
        })
        .catch((err) => {});
    }
  }, []);

  function handleImageDrop(file: File): void {
    if (!!product.newProductError.image) {
      dispatch(setNewProductError({ ...product.newProductError, image: "" }));
    }
    setFiles((previous: File[]) => [...previous, file]);
  }

  function handleLocalImageDelete(idx: number): void {
    setFiles((prevFiles) => {
      return prevFiles.filter((_, index) => index !== idx);
    });
  }

  const updateProduct = (field: string, value: any) => {
    const product: IProduct = { ...editedProduct, [field]: value };
    dispatch(setEditedProduct(product));
  };

  const handleSubmit = () => {
    const valid = validateNewProduct(editedProduct, mode, files);
    if (!valid) {
      return;
    }
    if (mode === ProductMode.CREATE) {
      addNewProduct(editedProduct, files)
        .then(() => {
          setFiles([]);
        })
        .catch(() => {});
    } else {
      updateProductCont(editedProduct, files)
        .then(() => {
          setFiles([]);
        })
        .catch(() => {});
    }
  };

  const onCancelClickHandler = () => {
    dispatch(setEditedProduct(selectedProduct));
    dispatch(setNewProductError(new NewProductError()));
    dispatch(setProductMode(ProductMode.VIEW));
  };

  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb="24px"
        >
          <Typography fontSize="24px" fontWeight="bold">
            {mode === ProductMode.CREATE
              ? "Add New Product"
              : selectedProduct.name}
          </Typography>
          <Box display="flex" gap="8px">
            {mode === ProductMode.VIEW && (
              <IconButton
                onClick={() => {
                  // setFiles([]);
                  dispatch(setProductMode(ProductMode.EDIT));
                }}
              >
                <Edit />
              </IconButton>
            )}
            <IconButton
              onClick={() => {
                dispatch(resetProductState());
                navigate("/product", { replace: true });
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Box component="form" mb="36px">
          <NewProductDetails
            editedProduct={editedProduct}
            updateProduct={updateProduct}
            mode={mode}
            onLocalImageDelete={handleLocalImageDelete}
            onImageDrop={handleImageDrop}
            files={files}
          />
          <NewProductProperties
            editedProduct={editedProduct}
            updateProduct={updateProduct}
            mode={mode}
          />
          <Grid container spacing={2}>
            <Grid item md={4}></Grid>
            <Grid item md={8}>
              <Box display="flex" justifyContent="space-between">
                <FormGroup>
                  <FormControlLabel
                    disabled={mode === ProductMode.VIEW}
                    control={
                      <Switch
                        color="success"
                        checked={editedProduct.featured}
                        onChange={(event) => {
                          updateProduct(
                            "featured",
                            event.currentTarget.checked
                          );
                        }}
                      />
                    }
                    label="Featured"
                  />
                  <FormControlLabel
                    disabled={mode === ProductMode.VIEW}
                    control={
                      <Switch
                        color="success"
                        checked={editedProduct.publish}
                        onChange={(event) => {
                          updateProduct("publish", event.currentTarget.checked);
                        }}
                      />
                    }
                    label="Publish"
                  />
                </FormGroup>
                <Box alignSelf="flex-end" display="flex" gap="8px">
                  {mode === ProductMode.EDIT && (
                    <Button variant="outlined" onClick={onCancelClickHandler}>
                      Cancel
                    </Button>
                  )}
                  {mode !== ProductMode.VIEW && (
                    <LoadingButton
                      loading={product.submitData}
                      title={
                        mode === ProductMode.CREATE ? "Add Product" : "Update"
                      }
                      onClick={handleSubmit}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
