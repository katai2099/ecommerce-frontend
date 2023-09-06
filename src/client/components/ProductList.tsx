import { Box, Grid } from "@mui/material";
import { IProduct } from "../../model/product";
import { ProductItem } from "./homepage/productList/ProductItem";
import { NoContentFound } from "./common/NoContentFound";

export interface ListLoadProps {
  firstLoad: boolean;
}

interface ProductListProps {
  products: IProduct[];
  totalItem: number;
}

export const ProductList = ({
  products,
  firstLoad,
  totalItem,
}: ProductListProps & ListLoadProps) => {
  return (
    <Grid container>
      {!firstLoad && totalItem != 0 && (
        <>
          {products.map((product, idx) => (
            <Grid item md={3} key={idx}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </>
      )}
      {!firstLoad && totalItem == 0 && (
        <Grid
          item
          md={12}
          alignItems="center"
          minHeight="50vh"
          justifyContent="center"
        >
          <Box
            height="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <NoContentFound />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
