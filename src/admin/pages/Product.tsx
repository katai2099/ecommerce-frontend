import { Close } from "@mui/icons-material";
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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LoadingButton } from "../../client/components/common/LoadingButton";
import { getProduct, setProductSizes } from "../../controllers/product";
import { IProduct, ProductMode } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  resetProductState,
  setEditedProduct,
  setProductMode,
  setSelectedProduct,
} from "../../reducers/productReducer";
import { useAppDispatch } from "../../store/configureStore";
import {
  NewProductDetails,
  NewProductProperties,
} from "../components/product/NewProductComp";

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
      getProduct(location.state)
        .then((res) => {
          dispatch(setEditedProduct(res));
          dispatch(setSelectedProduct(res));
        })
        .catch((err) => {});
    }
  }, []);

  const updateProduct = (field: string, value: any) => {
    const product: IProduct = { ...editedProduct, [field]: value };
    dispatch(setEditedProduct(product));
  };

  const handleSubmit = () => {
    //TODO: validate data
    // addNewProduct(editedProduct, files);
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
          <IconButton
            onClick={() => {
              dispatch(resetProductState());
              navigate("/product", { replace: true });
            }}
          >
            <Close />
          </IconButton>
        </Box>
        <Box component="form" mb="36px">
          <NewProductDetails />
          <NewProductProperties />
          <Grid container spacing={2}>
            <Grid item md={4}></Grid>
            <Grid item md={8}>
              <Box display="flex" justifyContent="space-between">
                <FormGroup>
                  <FormControlLabel control={<Switch />} label="Featured" />
                  <FormControlLabel control={<Switch />} label="Publish" />
                </FormGroup>
                <Box alignSelf="flex-end">
                  {mode === ProductMode.EDIT && (
                    <Button variant="outlined" onClick={onCancelClickHandler}>
                      Cancel
                    </Button>
                  )}
                  {mode !== ProductMode.VIEW && (
                    <LoadingButton
                      loading={product.submitData}
                      title={"Add Product"}
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
