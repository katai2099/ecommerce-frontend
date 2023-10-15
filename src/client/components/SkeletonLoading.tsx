import {
  Box,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

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

export const ProductReviewSkeletonLoading = ({
  amount,
}: skeletonCountProps) => {
  const theme = useTheme();
  const matchMb = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid display="flex" flexDirection="column" gap="16px">
      {Array.from(Array(amount)).map((_, idx) => (
        <Box key={idx}>
          <Typography variant="h3" fontWeight="bold">
            <Skeleton width={matchMb ? "30%" : "10%"} />
          </Typography>
          <Typography>
            <Skeleton width={matchMb ? "60%" : "20%"} />
          </Typography>
          <Typography>
            <Skeleton width={matchMb ? "100%" : "50%"} />
          </Typography>
          <Typography>
            <Skeleton width={matchMb ? "20%" : "8%"} />
          </Typography>
        </Box>
      ))}
    </Grid>
  );
};

export const ProductDetailSkeletonLoading = () => {
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} sm={5} xs={12}>
        <Skeleton variant="rectangular" height="300px" />
      </Grid>
      <Grid item lg={8} md={8} sm={7} xs={12}>
        <Box>
          <Box>
            <Typography variant="h1">
              <Skeleton width={matchMobile ? "40%" : "30%"} />
            </Typography>
            <Typography pt="8px" fontSize="16px">
              <Skeleton />
              <Skeleton />
            </Typography>
          </Box>
          <Box pt="16px">
            <Typography>
              <Skeleton width={matchMobile ? "40%" : "30%"} />
            </Typography>
          </Box>
          <Box pt="16px">
            <Typography variant="h2" color="primary">
              <Skeleton width={matchMobile ? "15%" : "10%"} />
            </Typography>
          </Box>
          <Box pb="4px">
            <Typography variant="h1">
              <Skeleton width={matchMobile ? "40%" : "30%"} />
            </Typography>
          </Box>

          <Box pb="16px">
            <Typography variant="h2">
              <Skeleton width={matchMobile ? "100%" : "30%"} />
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
