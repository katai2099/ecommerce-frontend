import { Box, Grid, Skeleton } from "@mui/material";

export const TopCategoriesSkeletonLoading = () => {
  return (
    <Grid container spacing={4}>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
      </Grid>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
      </Grid>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
      </Grid>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
      </Grid>
    </Grid>
  );
};

export const FeaturedProductSkeletonLoading = () => {
  return (
    <Grid container spacing={4}>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
      <Grid item md={3}>
        <Skeleton variant="rectangular" width="300px" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
