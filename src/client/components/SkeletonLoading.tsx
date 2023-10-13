import { Box, Grid, Skeleton, Stack } from "@mui/material";

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

interface skeletonCountProps {
  amount: number;
}

export const ProductListSkeletonLoading = ({ amount }: skeletonCountProps) => {
  return (
    <Grid container spacing={2}>
      {Array.from(Array(amount)).map((_, idx) => (
        <Grid key={idx} item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rectangular" height="300px" />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton width="40%" />
            <Skeleton width="20%" />
            <Box display="flex" justifyContent="space-between">
              <Skeleton width="30%" />
              <Skeleton width="30%" />
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export const FilterSkeletonLoading = () => {
  return (
    <Box height="100vh">
      <Stack spacing={1}>
        <Box>
          <Skeleton width="40%" variant="rectangular" height="20px" />
          <Skeleton height="100px" />
        </Box>
        <Box>
          <Skeleton width="40%" variant="rectangular" height="20px" />
          <Skeleton height="100px" />
        </Box>
        <Box>
          <Skeleton width="40%" variant="rectangular" height="20px" />
          <Skeleton height="100px" />
        </Box>
      </Stack>
    </Box>
  );
};
