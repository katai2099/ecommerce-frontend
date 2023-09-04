import { Clear } from "@mui/icons-material";
import { Box, FormControl, OutlinedInput, IconButton } from "@mui/material";
import { clone } from "../../../controllers/utils";
import { IProduct, ProductMode, IProductSize } from "../../../model/product";
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

  const updateProduct = (field: string, value: any) => {
    const product: IProduct = { ...editedProduct, [field]: value };
    dispatch(setEditedProduct(product));
  };

  return editedProduct.productSizes.length > 0 ? (
    <Box display="flex" alignItems="center" flexWrap="wrap" mb="8px">
      <Box className="flex-grow">
        <Box
          border="1px solid #1f1f1f"
          padding="14px 0px 14px 14px"
          borderRadius="4px"
          // width="80%"
        >
          {editedProduct.productSizes[idx].size.name}
        </Box>
      </Box>
      <FormControl className="flex-grow">
        <OutlinedInput
          type="number"
          // error
          disabled={mode === ProductMode.VIEW}
          required
          inputProps={{ min: 0 }}
          value={editedProduct.productSizes[idx].stockCount}
          onChange={(event) => {
            const stockCount = Number(event.currentTarget.value);
            const tmpProductSizes: IProductSize[] = clone(
              editedProduct.productSizes
            );
            tmpProductSizes[idx].stockCount = stockCount;
            updateProduct("productSizes", tmpProductSizes);
          }}
        />
        {/* <FormHelperText>required</FormHelperText> */}
      </FormControl>

      {mode !== ProductMode.VIEW && (
        <IconButton className="flex-grow">
          <Clear />
        </IconButton>
      )}
    </Box>
  ) : null;
};
