import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Rating,
  Select,
  Typography,
} from "@mui/material";
import { AppBox } from "../../styles/common";
import { CheckBox, ExpandMore } from "@mui/icons-material";
import { ProductItem } from "../components/homepage/productList/ProductItem";

export const Category = () => {
  const options: string[] = [
    "Recommended",
    "Newest Arrivals",
    "Price: High to Low",
    "Price: Low to High",
  ];
  return (
    <Box minHeight="84vh" margin="80px auto 0">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">View All</Typography>
        <Box display="flex" alignItems="center">
          <Typography>Sort by</Typography>
          <FormControl>
            <InputLabel></InputLabel>
            <Select defaultValue={options[0]}>
              <MenuItem value={options[0]}>Recommended</MenuItem>
              <MenuItem value={options[1]}>Newest Arrivals</MenuItem>
              <MenuItem value={options[2]}>Price: High to Low</MenuItem>
              <MenuItem value={options[3]}>Price: Low to High</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={0} md={2}>
          <Paper>
            <Accordion expanded>
              <AccordionSummary>
                <Typography variant="h5" fontWeight="bold">
                  Categories
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <InputLabel></InputLabel>
                  <Select defaultValue={options[0]}>
                    <MenuItem value={options[0]}>Recommended</MenuItem>
                    <MenuItem value={options[1]}>T Shirt</MenuItem>
                    <MenuItem value={options[2]}>Price: High to Low</MenuItem>
                    <MenuItem value={options[3]}>Price: Low to High</MenuItem>
                  </Select>
                </FormControl>
              </AccordionDetails>
            </Accordion>
            <Divider />
            <Box padding="16px">
              <Typography variant="h5" fontWeight="bold">
                Ratings
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Rating readOnly value={5} size="small" />}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Rating readOnly value={4} size="small" />}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Rating readOnly value={3} size="small" />}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Rating readOnly value={2} size="small" />}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label={<Rating readOnly value={1} size="small" />}
                />
              </FormGroup>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container>
            <Grid item md={3}>
              <ProductItem />
            </Grid>
            <Grid item md={3}>
              <ProductItem />
            </Grid>
            <Grid item md={3}>
              <ProductItem />
            </Grid>
            <Grid item md={3}>
              <ProductItem />
            </Grid>
            <Grid item md={3}>
              <ProductItem />
            </Grid>{" "}
            <Grid item md={3}>
              <ProductItem />
            </Grid>{" "}
            <Grid item md={3}>
              <ProductItem />
            </Grid>{" "}
            <Grid item md={3}>
              <ProductItem />
            </Grid>
            <Grid item md={3}>
              <ProductItem />
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt="32px"
          >
            <Typography>Showing 1-20 of 2000 products</Typography>
            <Pagination count={10} variant="outlined" color="primary" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
