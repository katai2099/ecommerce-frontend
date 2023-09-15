import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Rating,
  Typography,
} from "@mui/material";
import { PageNumberSection } from "../../../admin/components/PageNumberSection";

const ReviewItem = () => {
  return (
    <Box display="flex" alignItems="center" gap="16px" mb="24px">
      <Box>
        <Typography fontWeight="bold">THIS IS MY REVIEEW</Typography>
        <Box display="flex" alignItems="center" gap="16px">
          <Rating value={4.0} readOnly size="small" />
          <Typography>Aug 16, 2023</Typography>
        </Box>
        <Typography>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ut
          accusamus hic! Illum nulla impedit alias voluptatibus, molestias magni
          dolorum dolor eos, ex suscipit numquam quibusdam quo cum illo
          voluptates.
        </Typography>
        <Typography color="GrayText">KATAI PHOMMACHANH</Typography>
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
      <PageNumberSection
        currentPageTotalItem={0}
        totalPage={1}
        totalItem={10}
        page={0}
        handleLoadMoreClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        firstLoad={false}
        itemName={"reviews"}
      />
      <Typography variant="h3" mt="48px">
        Write a Review for this product
      </Typography>
      <form>
        <Box>
          <Box display="flex" mt="8px">
            <Typography variant="h4">Your Rating </Typography>
            <Typography variant="h4" color="error">
              &nbsp; *
            </Typography>
          </Box>
          <Rating value={3} size="medium" sx={{ mt: "8px" }} />
        </Box>
        <Box>
          <Box display="flex" my="8px">
            <Typography variant="h4">Your Review </Typography>
            <Typography variant="h4" color="error">
              &nbsp; *
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
