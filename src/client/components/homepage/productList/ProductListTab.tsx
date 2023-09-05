import { Grid } from "@mui/material";
import { ReactNode } from "react";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const ProductListTab = (props: TabPanelProps) => {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            {/* <ProductItem /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <ProductItem /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <ProductItem /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <ProductItem /> */}
          </Grid>
        </Grid>
      )}
    </div>
  );
};
