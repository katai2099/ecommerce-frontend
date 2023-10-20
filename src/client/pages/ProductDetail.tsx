import {
  Box,
  Button,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AxiosError } from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addToCart,
  getProduct,
  getProductReviews,
  getProductUserReview,
} from "../../controllers/product";
import { formatPrice, showSnackBar } from "../../controllers/utils";
import {
  IErrorResponse,
  IPaginationFilterData,
  PaginationFilterData,
} from "../../model/common";
import { RootState } from "../../reducers/combineReducer";
import { AppBox, TabPanel } from "../../styles/common";
import { ProductDetailSkeletonLoading } from "../components/SkeletonLoading";
import { LoadingButton } from "../components/common/LoadingButton";
import { Description } from "../components/productDetails/Description";
import { ImageSection } from "../components/productDetails/ImageSection";
import { Reviews } from "../components/productDetails/Reviews";

export const ProductDetail = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isAddTocart, setIsAddToCart] = useState<boolean>(false);
  const productDetail = useSelector((state: RootState) => state.productDetail);
  const product = productDetail.product;
  const loading = productDetail.isLoading;
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user);
  const handleChange = (event: SyntheticEvent, value: any) => {
    setCurrentTab(value);
  };
  //product review data
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [paginationFilterData, setPaginationFilterData] =
    useState<IPaginationFilterData>(new PaginationFilterData());
  const [filterPage, setFilterPage] = useState<number>(1);
  const { id } = useParams();

  useEffect(() => {
    //TODO: 404 and undefined id
    getProduct(id!).catch((err) => {});
  }, [id]);

  useEffect(() => {
    if (user.loggedIn) {
      getProductUserReview(id!).catch((err) => {});
    }
  }, []);

  const handleAddToCart = () => {
    setIsAddToCart(true);
    addToCart(product, selectedSizeIndex)
      .then(() => {
        showSnackBar("Added to Cart", "success");
      })
      .catch((err: AxiosError) => {
        if (err.response?.status !== 500) {
          showSnackBar(
            (err.response?.data! as IErrorResponse).message,
            "error"
          );
        } else {
          showSnackBar("Something went wrong", "error");
        }
      })
      .finally(() => {
        setIsAddToCart(false);
      });
  };

  useEffect(() => {
    getProductReviews(Number(id!), filterPage)
      .then((res) => {
        setFirstLoad(false);
        const updatedPaginationData: IPaginationFilterData = {
          page: res.currentPage,
          totalPage: res.totalPage,
          totalItem: res.totalItem,
          currentPageTotalItem: res.data.length,
        };
        setPaginationFilterData(updatedPaginationData);
      })
      .catch((err) => {});
  }, [filterPage]);

  const handleLoadMoreClick = () => {
    setFilterPage((prev) => prev + 1);
  };

  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBox>
      <Grid container spacing={3}>
        {loading && <ProductDetailSkeletonLoading />}
        {!loading && (
          <>
            <Grid
              item
              lg={4}
              md={4}
              sm={5}
              xs={12}
              display="flex"
              flexDirection="column"
              alignItems="center"
              width="100%"
            >
              <ImageSection images={product.images} />
            </Grid>
            <Grid item lg={8} md={8} sm={7} xs={12}>
              <Box>
                <Box>
                  <Typography variant="h2">{product.name}</Typography>
                  <Typography pt="8px" fontSize="16px" color="GrayText">
                    {product.description}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" pt="16px">
                  <Typography>Rating: &nbsp;</Typography>
                  <Rating value={product.rating} readOnly size="small" />
                  <Typography fontWeight="bold">
                    &nbsp;{product.rating.toFixed(1)}
                  </Typography>
                  <Typography ml="4px">
                    ({product.totalReview} reviews)
                  </Typography>
                </Box>
                <Box pt="16px">
                  <Typography variant="h3" color="primary">
                    {formatPrice(product.price)}
                  </Typography>
                </Box>
                <Box pt="16px" pb="4px">
                  <Typography pb="4px">Sizes:</Typography>
                  <Box display="flex" gap="8px" flexWrap="wrap">
                    {product.productSizes.map((productSize, idx) => (
                      <Button
                        key={idx}
                        variant={
                          selectedSizeIndex === idx ? "contained" : "outlined"
                        }
                        color={selectedSizeIndex === idx ? "primary" : "info"}
                        onClick={() => {
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
                  disabled={
                    product.productSizes.length > 0 &&
                    product.productSizes[selectedSizeIndex].stockCount === 0
                  }
                  title="add to cart"
                  loading={isAddTocart}
                  onClick={handleAddToCart}
                  fullWidth={matchSm}
                />
              </Box>
            </Grid>
          </>
        )}
      </Grid>

      <Box mt="72px">
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: "24px" }}>
          <Tabs value={currentTab} onChange={handleChange}>
            <Tab label="Description" />
            <Tab label="Reviews" />
          </Tabs>
        </Box>

        <TabPanel index={0} value={currentTab}>
          <Description description={product.description} />
        </TabPanel>
        <TabPanel index={1} value={currentTab}>
          <Reviews
            productId={Number(id!)}
            firstLoad={firstLoad}
            paginationFilterData={paginationFilterData}
            filterPage={filterPage}
            handleLoadMoreClick={handleLoadMoreClick}
          />
        </TabPanel>
      </Box>
    </AppBox>
  );
};
