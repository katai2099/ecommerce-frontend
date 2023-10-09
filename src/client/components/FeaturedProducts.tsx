import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatPrice } from "../../controllers/utils";
import { IProduct, ProductProps } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import { FeaturedProductSkeletonLoading } from "./SkeletonLoading";

const mdItemsPerPage = 4;
const smItemsPerpage = 2;
interface FeaturedProductsSlideProps {
  startIndex: number;
  endIndex: number;
  featuredProducts: IProduct[];
}

const FeaturedProductItem = ({ product }: ProductProps) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Box alignSelf="center">
        <Link to={`/products/${product.id}`}>
          <Box width="100%" mb="4px">
            <img
              width="100%"
              height="100%"
              src={product.images[0].imageUrl}
              className="img-contain"
            />
          </Box>
        </Link>
      </Box>
      <Box display="flex" justifyContent="space-between" padding="0 32px">
        <Box>
          <Link to={`/products/${product.id}`} className="nav-item">
            <Typography color="primary">{product.name}</Typography>
          </Link>
          <Typography>{formatPrice(product.price)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const FeaturedProductsSlide = ({
  startIndex,
  endIndex,
  featuredProducts,
}: FeaturedProductsSlideProps) => {
  const currentFeaturedProducts = featuredProducts.slice(startIndex, endIndex);
  return (
    <Grid container spacing={3}>
      {currentFeaturedProducts.map((featuredProduct) => (
        <Grid item sm={6} md={3} key={featuredProduct.id}>
          <FeaturedProductItem product={featuredProduct} />
        </Grid>
      ))}
    </Grid>
  );
};

export const FeaturedProducts = () => {
  const featuredProducts = useSelector(
    (state: RootState) => state.homepage.featuredProducts
  );
  const loading = useSelector(
    (state: RootState) => state.homepage.featuredProductsLoading
  );
  const error = useSelector(
    (state: RootState) => state.homepage.featuredProductsError
  );
  const [mbIndex, setMbIndex] = useState<number>(0);
  const [lgIndex, setLgIndex] = useState<number>(0);
  const [smIndex, setSmIndex] = useState<number>(0);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const matchSM = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const totalPages = Math.ceil(
    featuredProducts.length / (matchSM ? smItemsPerpage : mdItemsPerPage)
  );

  const handleLgIdxChange = (idx: number) => {
    if (idx < 0) {
      setLgIndex(totalPages - 1);
    } else if (idx === totalPages) {
      setLgIndex(0);
    } else {
      setLgIndex(idx);
    }
  };

  return (
    <Box my="48px">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h3" fontWeight="bold">
          Featured Products
        </Typography>
        {!matches &&
          !matchSM &&
          !loading &&
          !error &&
          featuredProducts.length !== 0 && (
            <Box>
              <IconButton
                onClick={() => {
                  handleLgIdxChange(lgIndex - 1);
                }}
                sx={{
                  mr: "4px",
                  padding: "8px",
                  bgcolor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleLgIdxChange(lgIndex + 1);
                }}
                sx={{
                  padding: "8px",
                  bgcolor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}
      </Box>
      {!loading && featuredProducts.length !== 0 && !error && (
        <Grid container>
          {matches ? (
            <Grid item xs={12}>
              <Carousel
                autoPlay={false}
                sx={{ mt: "36px", paddingX: "16px" }}
                indicators
                navButtonsAlwaysVisible
                index={mbIndex}
                onChange={(now) => {
                  setMbIndex(now!);
                }}
                next={(index) => {
                  setMbIndex(index!);
                }}
                prev={(index) => {
                  setMbIndex(index!);
                }}
                animation="slide"
                height="380px"
              >
                {featuredProducts.map((featuredProduct) => (
                  <FeaturedProductItem
                    key={featuredProduct.id}
                    product={featuredProduct}
                  />
                ))}
              </Carousel>
            </Grid>
          ) : (
            <Grid item sm={12} md={12}>
              <Carousel
                autoPlay={false}
                sx={{ mt: "36px" }}
                indicators
                index={matchSM ? smIndex : lgIndex}
                onChange={(now) => {
                  matchSM ? setSmIndex(now!) : setLgIndex(now!);
                }}
                next={(index) => {
                  matchSM ? setSmIndex(index!) : setLgIndex(index!);
                }}
                prev={(index) => {
                  matchSM ? setSmIndex(index!) : setLgIndex(index!);
                }}
                height="350px"
                animation="slide"
              >
                {Array.from(Array(totalPages)).map((_, idx) => (
                  <FeaturedProductsSlide
                    key={idx}
                    startIndex={
                      matchSM ? idx * smItemsPerpage : idx * mdItemsPerPage
                    }
                    endIndex={
                      matchSM
                        ? idx * smItemsPerpage + smItemsPerpage
                        : idx * mdItemsPerPage + mdItemsPerPage
                    }
                    featuredProducts={featuredProducts}
                  />
                ))}
              </Carousel>
            </Grid>
          )}
        </Grid>
      )}
      {loading && <FeaturedProductSkeletonLoading />}
      {!error && !loading && featuredProducts.length === 0 && (
        <Box>
          <Typography
            variant="h1"
            textAlign="center"
            mt="24px"
            letterSpacing="-1.5px"
          >
            There is no featured products at the moment
          </Typography>
        </Box>
      )}
      {error && !loading && (
        <Typography
          variant="h1"
          textAlign="center"
          mt="24px"
          letterSpacing="-1.5px"
        >
          Something went wrong
        </Typography>
      )}
    </Box>
  );
};
