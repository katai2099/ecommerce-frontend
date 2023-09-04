import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { AppBox, TabPanel } from "../../styles/common";
import { Description } from "../components/productDetails/Description";
import { SyntheticEvent, useState } from "react";
import { Review } from "../components/productDetails/Review";

export const Product = () => {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, value: any) => {
    setValue(value);
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
          <Box>
            <img src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FClothes%2F21.YellowCasualSweater.png&w=384&q=75" />
          </Box>
          <Box
            display="flex"
            justifyItems="center"
            alignItems="center"
            gap="16px"
          >
            <Box width="64px" height="64px" border="1px solid #000000">
              <img
                width="64px"
                src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FClothes%2F21.YellowCasualSweater.png&w=384&q=75"
              ></img>
            </Box>
            <Box width="64px" height="64px" border="1px solid #dfdfdf">
              <img
                width="64px"
                src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FClothes%2F21.YellowCasualSweater.png&w=384&q=75"
              ></img>
            </Box>
            <Box width="64px" height="64px" border="1px solid #dfdfdf">
              <img
                width="64px"
                src="https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fproducts%2FFashion%2FClothes%2F21.YellowCasualSweater.png&w=384&q=75"
              ></img>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={8} pl="24px">
          <Box>
            <Box>
              <Typography variant="h4">SWEATER</Typography>
              <Typography variant="h5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
                nostrum consequatur maxime, aut eius pariatur! Soluta fugiat
                odit a sunt laboriosam veniam, minus hic, facere nulla inventore
                voluptate quisquam aperiam.
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Typography>Rated: </Typography>
              <Rating value={4} readOnly size="small" />
              <Typography>(50)</Typography>
            </Box>
            <Box>
              <Typography>Sizes</Typography>
              <Box display="flex" gap="8px">
                <Button variant="contained">M</Button>
                <Button variant="outlined" color="info">
                  L
                </Button>
                <Button variant="outlined" color="info">
                  XL
                </Button>
                <Button variant="outlined" color="info">
                  XL
                </Button>
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
