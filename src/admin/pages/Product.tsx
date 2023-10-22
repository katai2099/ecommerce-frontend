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
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "../../client/components/common/LoadingButton";
import {
  addNewProduct,
  updateProductCont,
  validateNewProduct,
} from "../../controllers/product";
import { AdminMode } from "../../model/admin";
import { IProduct, NewProductError } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  resetProductState,
  setEditedProduct,
  setNewProductError,
  setProductMode,
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
    if (!validateNewProduct(editedProduct, mode, files)) {
      return;
    }
    if (mode === AdminMode.CREATE) {
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
    dispatch(setProductMode(AdminMode.VIEW));
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
            {mode === AdminMode.CREATE
              ? "Add New Product"
              : selectedProduct.name}
          </Typography>
          <Box display="flex" gap="8px">
            {mode === AdminMode.VIEW && (
              <IconButton
                onClick={() => {
                  dispatch(setProductMode(AdminMode.EDIT));
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
                    disabled={mode === AdminMode.VIEW}
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
                    disabled={mode === AdminMode.VIEW}
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
                  {mode === AdminMode.EDIT && (
                    <Button variant="outlined" onClick={onCancelClickHandler}>
                      Cancel
                    </Button>
                  )}
                  {mode !== AdminMode.VIEW && (
                    <LoadingButton
                      loading={product.submitData}
                      title={
                        mode === AdminMode.CREATE ? "Add Product" : "Update"
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
