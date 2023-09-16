import {
  Box,
  Button,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductAction } from "../../actions/productActions";
import { addToCart } from "../../controllers/product";
import { IProduct, Product } from "../../model/product";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox, TabPanel } from "../../styles/common";
import { LoadingButton } from "../components/common/LoadingButton";
import { Description } from "../components/productDetails/Description";
import { ImageSection } from "../components/productDetails/ImageSection";
import { Review } from "../components/productDetails/Review";

export const ProductDetail = () => {
  const [value, setValue] = useState<number>(0);
  const [isAddTocart, setIsAddToCart] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>(new Product());
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, value: any) => {
    setValue(value);
  };
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    //TODO: 404 and undefined id
    dispatch(getProductAction(id!))
      .unwrap()
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    setIsAddToCart(true);
    addToCart(product, selectedSizeIndex)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsAddToCart(false);
      });
  };

  return (
    <AppBox>
      <Grid container>
        <Grid
          item
          lg={4}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <ImageSection images={product.images} />
        </Grid>
        <Grid item lg={8} pl="24px">
          <Box>
            <Box>
              <Typography variant="h2">{product.name}</Typography>
              <Typography pt="8px" fontSize="16px" color="GrayText">
                {product.description}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" pt="16px">
              <Typography>Rated: </Typography>
              <Rating value={product.rating} readOnly size="small" />
              <Typography ml="4px">({product.totalReview})</Typography>
            </Box>
            <Box pt="16px">
              <Typography variant="h3" color="primary">
                {`$${product.price.toFixed(2)}`}
              </Typography>
            </Box>
            <Box pt="16px" pb="4px">
              <Typography pb="4px">Sizes</Typography>
              <Box display="flex" gap="8px">
                {product.productSizes.map((productSize, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedSizeIndex === idx ? "contained" : "outlined"
                    }
                    color={selectedSizeIndex === idx ? "primary" : "info"}
                    onClick={() => {
                      console.log(product);
                      setSelectedSizeIndex(idx);
                    }}
                  >
                    {productSize.size.name}
                  </Button>
                ))}
              </Box>
            </Box>
            {product.productSizes.length > 0 && (
              <Box pb="16px" display="flex">
                <Typography>Availability: &nbsp;</Typography>
                <Typography
                  color={
                    product.productSizes[selectedSizeIndex].stockCount === 0
                      ? "error"
                      : "green"
                  }
                >
                  {product.productSizes[selectedSizeIndex].stockCount === 0
                    ? "Out of stock"
                    : `${product.productSizes[selectedSizeIndex].stockCount} in stock`}
                </Typography>
              </Box>
            )}
            <LoadingButton
              title="add to cart"
              loading={isAddTocart}
              onClick={handleAddToCart}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt="72px">
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: "24px" }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Description" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>

        <TabPanel index={0} value={value}>
          <Description description={product.description} />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Review />
        </TabPanel>
      </Box>
    </AppBox>
  );
};
