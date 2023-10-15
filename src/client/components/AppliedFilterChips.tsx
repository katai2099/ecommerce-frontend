import { Star } from "@mui/icons-material";
import { Box, Button, Chip, colors } from "@mui/material";
import { useSelector } from "react-redux";
import { isFilterEmpty } from "../../controllers/product";
import { productSort } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  resetGenderSectionFilter,
  resetSearchFilter,
  resetTopCategoryFilter,
  setProductsFilter,
} from "../../reducers/productListReducer";
import { useAppDispatch } from "../../store/configureStore";

export const AppliedFilterChips = () => {
  const dispatch = useAppDispatch();
  const productList = useSelector((state: RootState) => state.productList);
  const filter = productList.filter;
  const isSearch = productList.isSearch;
  const isTopCategory = productList.isTopCategory;
  const filterEmpty = isFilterEmpty(
    filter,
    isTopCategory,
    !isTopCategory && !isSearch
  );

  const handleDeleteCategoryFilter = (idx: number) => {
    const updatedCategories = filter.category.filter(
      (_, index) => idx !== index
    );
    dispatch(
      setProductsFilter({
        ...filter,
        category: updatedCategories,
      })
    );
  };

  return (
    <Box display="flex" gap="8px" flexWrap="wrap">
      {filter.sort !== undefined && filter.sort !== productSort[0] && (
        <Chip
          label={`Sort by: ${filter.sort}`}
          onDelete={() => {
            dispatch(setProductsFilter({ ...filter, sort: productSort[0] }));
          }}
        ></Chip>
      )}
      {(isSearch || isTopCategory) && (
        <>
          {!!(filter.gender && filter.gender.length > 0) &&
            filter.gender.map((sex, idx) => (
              <Chip
                key={sex}
                label={sex}
                onDelete={() => {
                  const updatedGender = filter.gender.filter(
                    (_, index) => idx !== index
                  );
                  dispatch(
                    setProductsFilter({ ...filter, gender: updatedGender })
                  );
                }}
              />
            ))}
        </>
      )}
      {!!(
        filter.category.length > 0 && filter.category[0].toLowerCase() !== "all"
      ) &&
        filter.category.map((cat, idx) => (
          <Chip
            key={cat}
            label={cat}
            onDelete={() => {
              handleDeleteCategoryFilter(idx);
            }}
            disabled={isTopCategory}
          />
        ))}
      {!!(
        filter.pmin !== undefined &&
        filter.pmax &&
        (filter.pmin !== 0 || filter.pmax !== 100)
      ) && (
        <Chip
          label={`${filter.pmin} - ${filter.pmax} $`}
          onDelete={() => {
            dispatch(setProductsFilter({ ...filter, pmin: 0, pmax: 100 }));
          }}
        />
      )}
      {!!(filter.rating !== undefined && filter.rating !== 0) && (
        <Chip
          label={`${filter.rating}`}
          icon={<Star fontSize="small" color="warning" />}
          onDelete={() => {
            dispatch(setProductsFilter({ ...filter, rating: 0 }));
          }}
        />
      )}
      {!filterEmpty && (
        <Button
          sx={{
            textDecoration: "underline",
            textTransform: "none",
            ":hover": { textDecoration: "underline" },
            color: colors.blue[700],
          }}
          onClick={() => {
            if (isSearch) {
              dispatch(resetSearchFilter());
            } else if (isTopCategory) {
              dispatch(resetTopCategoryFilter());
            } else {
              dispatch(resetGenderSectionFilter());
            }
          }}
        >
          Reset Filters
        </Button>
      )}
    </Box>
  );
};
