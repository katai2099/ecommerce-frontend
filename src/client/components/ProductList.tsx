import { Box, Grid } from "@mui/material";
import { IProduct } from "../../model/product";
import { SomethingWentWrong } from "../../styles/common";
import { ProductListSkeletonLoading } from "./SkeletonLoading";
import { NoContentFound } from "./common/NoContentFound";
import { ProductItem } from "./homepage/productList/ProductItem";

export interface ListLoadProps {
  firstLoad: boolean;
  error?: boolean;
}

interface ProductListProps {
  products: IProduct[];
  totalItem: number;
}

export const ProductList = ({
  products,
  firstLoad,
  totalItem,
  error = false,
}: ProductListProps & ListLoadProps) => {
  if (firstLoad) return <ProductListSkeletonLoading amount={12} />;
  return (
    <Grid container spacing={2}>
      {!firstLoad && !error && totalItem > 0 && (
        <>
          {products.map((product, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </>
      )}
      {!firstLoad && !error && totalItem === 0 && (
        <Grid
          item
          xs={12}
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
      {!firstLoad && error && <SomethingWentWrong />}
    </Grid>
  );
};
