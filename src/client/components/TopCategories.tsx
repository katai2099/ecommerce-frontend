import { Box, Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CategoryProps } from "../../model/category";
import { RootState } from "../../reducers/combineReducer";
import { TopCategoriesSkeletonLoading } from "./SkeletonLoading";

const TopCategoryItem = ({ category }: CategoryProps) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        width="100%"
        bgcolor="rgba(64,64,64,0.1)"
      >
        <img width="100%" src={category.categoryImage} />
        <Box
          alignSelf="center"
          position="absolute"
          bottom="0"
          padding="0px 32px 20% 32px"
          width="100%"
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "#d8d8d8",
                color: "black",
              },
            }}
            onClick={() => {
              navigate(`/search/?category=${category.name}`);
            }}
          >
            Shop {category.name}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const TopCategories = () => {
  const topCategories = useSelector(
    (state: RootState) => state.homepage.topCategories
  );
  const loading = useSelector(
    (state: RootState) => state.homepage.topCategoriesLoading
  );
  const error = useSelector(
    (state: RootState) => state.homepage.topCategoriesError
  );
  return (
    <Box my="48px">
      <Typography variant="h3" fontWeight="bold" mb="24px">
        Top Categories
      </Typography>
      {!loading && topCategories.length !== 0 && !error && (
        <Grid container spacing={3}>
          {topCategories.map((category) => (
            <Grid key={category.id} item xs={12} sm={6} md={3}>
              <TopCategoryItem category={category} />
            </Grid>
          ))}
        </Grid>
      )}
      {loading && <TopCategoriesSkeletonLoading />}
      {!error && !loading && topCategories.length === 0 && (
        <Box>
          <Typography variant="h1" textAlign="center" letterSpacing="-1.5px">
            There is no top categories at the moment
          </Typography>
        </Box>
      )}
      {error && !loading && (
        <Typography variant="h1" textAlign="center" letterSpacing="-1.5px">
          Something went wrong
        </Typography>
      )}
    </Box>
  );
};
