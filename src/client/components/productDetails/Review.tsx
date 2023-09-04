import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputBase,
  OutlinedInput,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

const ReviewItem = () => {
  return (
    <Box display="flex" alignItems="center" gap="16px" mb="24px">
      <Box width="48px" height="48px">
        <img
          width="48px"
          height="48px"
          src="https://bazaar.ui-lib.com/assets/images/faces/8.png"
          alt=""
        />
      </Box>
      <Box>
        <Typography>KATAI PHOMMACAHNH</Typography>
        <Box display="flex" alignItems="center" gap="16px">
          <Rating value={4.0} readOnly size="small" />
          <Typography fontWeight="bold">4.0</Typography>
          <Typography>Aug 16, 2023</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const Review = () => {
  return (
    <Box>
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <ReviewItem />
      <Typography variant="h3" mt="48px">
        Write a Review for this product
      </Typography>
      <form>
        <Box>
          <Box display="flex">
            <Typography variant="h5">Your Rating </Typography>
            <Typography variant="h5" color="error">
              {" "}
              *
            </Typography>
          </Box>
          <Rating value={3} size="medium" />
        </Box>
        <Box>
          <Box display="flex">
            <Typography variant="h5">Your Review </Typography>
            <Typography variant="h5" color="error">
              {" "}
              *
            </Typography>
          </Box>
          <FormControl fullWidth>
            <OutlinedInput
              multiline
              rows={8}
              fullWidth
              required
              placeholder="Write a review here"
            />
            <FormHelperText error>required</FormHelperText>
          </FormControl>
        </Box>
        <Button variant="contained">Submit</Button>
      </form>
    </Box>
  );
};
