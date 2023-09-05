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
import { IProduct, Product } from "../../model/product";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox, TabPanel } from "../../styles/common";
import { Description } from "../components/productDetails/Description";
import { ImageSection } from "../components/productDetails/ImageSection";
import { Review } from "../components/productDetails/Review";

export const ProductDetail = () => {
  const [value, setValue] = useState<number>(0);
  const [product, setProduct] = useState<IProduct>(new Product());
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, value: any) => {
    setValue(value);
  };
  const dispatch = useAppDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductAction(id!))
      .unwrap()
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, []);
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
              <Typography variant="h4">{product.name}</Typography>
              <Typography variant="h5">{product.description}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography>Rated: </Typography>
              <Rating value={4} readOnly size="small" />
              <Typography>(50)</Typography>
            </Box>
            <Box>
              <Typography>Sizes</Typography>
              <Box display="flex" gap="8px">
                {product.productSizes.map((productSize, idx) => (
                  <Button
                    variant={
                      selectedColorIndex === idx ? "contained" : "outlined"
                    }
                    color={selectedColorIndex === idx ? "primary" : "info"}
                  >
                    {productSize.size.name}
                  </Button>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="h4" color="primary">
                $233.00
              </Typography>
            </Box>
            <Button variant="contained">Add to cart</Button>
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
          <Description />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <Review />
        </TabPanel>
      </Box>
    </AppBox>
  );
};
