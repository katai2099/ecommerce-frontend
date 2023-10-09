import { Box, Grid, Skeleton } from "@mui/material";

export const TopCategoriesSkeletonLoading = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
      </Grid>
    </Grid>
  );
};

export const FeaturedProductSkeletonLoading = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
        <Box sx={{ pt: 0.5 }}>
          <Skeleton width="30%" />
          <Box display="flex" justifyContent="space-between">
            <Skeleton width="30%" />
            <Skeleton width="30%" />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Skeleton variant="rectangular" height="300px" />
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
