import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { IProduct, ProductMode } from "../../../model/product";
import { RootState } from "../../../reducers/combineReducer";
import { setEditedProduct } from "../../../reducers/productReducer";
import { useAppDispatch } from "../../../store/configureStore";

interface ProductStockProps {
  idx: number;
  editedProduct: IProduct;
  mode: ProductMode;
}

export const ProductStock = ({
  idx,
  editedProduct,
  mode,
}: ProductStockProps) => {
  const dispatch = useAppDispatch();
  const disable = mode === ProductMode.VIEW;
  const updateProduct = (field: string, value: any) => {
    const product: IProduct = { ...editedProduct, [field]: value };
    dispatch(setEditedProduct(product));
  };

  const adminSettings = useSelector((state: RootState) => state.admin);

  return (
    <Box display="flex" alignItems="center" my="8px" gap="8px">
      <Box width="50%">
        <FormControl fullWidth>
          <InputLabel>Size</InputLabel>
          <Select
            label="Size"
            value={editedProduct.productSizes[idx].size.id}
            disabled={disable}
            onChange={(event) => {
              const updatedSize = adminSettings.sizes.find(
                (size) => size.id === Number(event.target.value)
              );
              const updatedProductSizes = editedProduct.productSizes.map(
                (productSize, index) =>
                  index === idx
                    ? { ...productSize, size: updatedSize }
                    : productSize
              );
              updateProduct("productSizes", updatedProductSizes);
            }}
          >
            {adminSettings.sizes.map((size) => (
              <MenuItem
                disabled={
                  editedProduct.productSizes.findIndex(
                    (element) => element.size.id === size.id
                  ) !== -1
                }
                value={size.id}
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
          value={editedProduct.productSizes[idx].stockCount}
          fullWidth
          type="number"
          required
          disabled={disable}
          inputProps={{ min: 0 }}
          onChange={(event) => {
            const newValue = Number(event.currentTarget.value);
            if (!isNaN(newValue)) {
              const updatedProductSizes = editedProduct.productSizes.map(
                (productSize, index) =>
                  index === idx
                    ? { ...productSize, stockCount: newValue }
                    : productSize
              );
              updateProduct("productSizes", updatedProductSizes);
            }
          }}
        />
      </Box>
      <Button
        disabled={disable}
        sx={{
          textTransform: "none",
          textDecoration: "underline",
          ":hover": {
            textDecoration: "underline",
          },
        }}
        onClick={() => {
          const updatedProductSizes = editedProduct.productSizes.filter(
            (_, index) => idx !== index
          );
          updateProduct("productSizes", updatedProductSizes);
        }}
      >
        Remove
      </Button>
    </Box>
  );
};
