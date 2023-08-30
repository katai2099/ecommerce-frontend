import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { ProductListTab } from "./ProductListTab";
import { SyntheticEvent, useState } from "react";

export const ShoppingList = () => {
  const [value, setValue] = useState<number>(0);
  const handleChange = (event: SyntheticEvent, value: any) => {
    setValue(value);
  };
  return (
    <Container>
      <Box
        width="100%"
        margin="0px auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h3">OUR FEATURED PRODUCTS</Typography>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            label="All"
            id={`simple-tab-1`}
            aria-controls={`simple-tab-panel-1`}
          />
          <Tab
            label="New Arrivals"
            id={`simple-tab-2`}
            aria-controls={`simple-tab-panel-2`}
          />
          <Tab
            label="Best Sellers"
            id={`simple-tab-3`}
            aria-controls={`simple-tab-panel-3`}
          />
          <Tab
            label="Top rated"
            id={`simple-tab-4`}
            aria-controls={`simple-tab-panel-4`}
          />
        </Tabs>
        <ProductListTab children={undefined} index={0} value={value} />
        <ProductListTab children={undefined} index={1} value={value} />
        <ProductListTab children={undefined} index={2} value={value} />
        <ProductListTab children={undefined} index={3} value={value} />
      </Box>
    </Container>
  );
};
