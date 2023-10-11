import { FormControl } from "@mui/base";
import { Close, ExpandMore, FilterList, Star } from "@mui/icons-material";
import {
  Drawer,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { productSort, productSortName } from "../../model/product";
import { RootState } from "../../reducers/combineReducer";
import {
  setMobileFilterDrawerOpen,
  setProductsFilter,
} from "../../reducers/productListReducer";
import { useAppDispatch } from "../../store/configureStore";
import {
  EAccordion,
  EAccordionDetails,
  EAccordionSummary,
} from "../../styles/common";
import { AppliedFilterChips } from "./AppliedFilterChips";
import { CategoryFilter } from "./CategoryFilter";
import { GenderFilter } from "./GenderFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { RatingFilter } from "./RatingFilter";

export interface LgScreenProps {
  isLgScreen?: boolean;
}

export const MobileFilter = () => {
  const dispatch = useAppDispatch();
  const productList = useSelector((state: RootState) => state.productList);
  const open = productList.mobileFilterDrawerOpen;
  const isSearch = productList.isSearch;
  const filter = useSelector((state: RootState) => state.productList.filter);

  return (
    <Box mt="12px" mb="24px">
      <Box display="flex" justifyContent="space-between">
        <Box mt="8px">
          <AppliedFilterChips />
        </Box>
        <Box textAlign="end">
          <IconButton
            onClick={() => {
              dispatch(setMobileFilterDrawerOpen(true));
            }}
          >
            <FilterList />
          </IconButton>
        </Box>
      </Box>
      <Drawer
        open={open}
        anchor="right"
        onClose={() => {
          dispatch(setMobileFilterDrawerOpen(false));
        }}
      >
        <Box padding="0 16px" minWidth="300px">
          <Box
            mt="12px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3" fontWeight="bold">
              Filters & Sort
            </Typography>
            <IconButton
              onClick={() => {
                dispatch(setMobileFilterDrawerOpen(false));
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box mt="12px">
            <EAccordion>
              <EAccordionSummary
                expandIcon={<ExpandMore />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
              >
                <Typography>Sort By: {filter.sort}</Typography>
              </EAccordionSummary>
              <EAccordionDetails>
                <FormControl>
                  <RadioGroup name="sort" value={filter.sort}>
                    {productSort.map((sort, idx) => (
                      <FormControlLabel
                        key={sort}
                        value={sort}
                        control={<Radio size="small" />}
                        label={productSortName[idx]}
                        onChange={() => {
                          dispatch(
                            setProductsFilter({ ...filter, sort: sort })
                          );
                        }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </EAccordionDetails>
            </EAccordion>
          </Box>
          {isSearch && (
            <Box mt="12px">
              <EAccordion>
                <EAccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-label="Expand"
                  aria-controls="-content"
                  id="-header"
                >
                  <Typography>Gender: {filter.gender}</Typography>
                </EAccordionSummary>
                <EAccordionDetails>
                  <GenderFilter isLgScreen={false} />
                </EAccordionDetails>
              </EAccordion>
            </Box>
          )}
          <Box mt="12px">
            <EAccordion>
              <EAccordionSummary
                expandIcon={<ExpandMore />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
              >
                <Typography>
                  Category: {filter.category[0] ? filter.category[0] : "All"}
                </Typography>
              </EAccordionSummary>
              <EAccordionDetails>
                <CategoryFilter isLgScreen={false} />
              </EAccordionDetails>
            </EAccordion>
          </Box>
          <Box mt="12px">
            <EAccordion>
              <EAccordionSummary
                expandIcon={<ExpandMore />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
              >
                <Typography>
                  Price: {`${filter.pmin} - ${filter.pmax}`}
                </Typography>
              </EAccordionSummary>
              <EAccordionDetails>
                <PriceRangeFilter isLgScreen={false} />
              </EAccordionDetails>
            </EAccordion>
          </Box>
          <Box mt="12px">
            <EAccordion>
              <EAccordionSummary
                expandIcon={<ExpandMore />}
                aria-label="Expand"
                aria-controls="-content"
                id="-header"
              >
                <Box display="flex" alignItems="center" gap="2px">
                  <Typography>Rating: </Typography>
                  <Star fontSize="small" color="warning" />
                  <Typography>{filter.rating}</Typography>
                </Box>
              </EAccordionSummary>
              <EAccordionDetails>
                <RatingFilter isLgScreen={false} />
              </EAccordionDetails>
            </EAccordion>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
