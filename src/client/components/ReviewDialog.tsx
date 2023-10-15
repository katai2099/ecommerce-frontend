import { Close } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  OutlinedInput,
  Rating,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { INewReview } from "../../model/review";
import { RootState } from "../../reducers/combineReducer";
import { DialogProps } from "./NewAddressDialog";

interface ReviewDialogProps {
  handleReviewChange: (key: string, value: any) => void;
  handleSubmitButtonClick: (newReview: INewReview) => void;
  newReview: INewReview;
  newReviewError: INewReview;
}

export const ReviewDialog = ({
  open,
  handleDialogState,
  handleReviewChange,
  handleSubmitButtonClick,
  newReview,
  newReviewError,
}: ReviewDialogProps & DialogProps) => {
  const reviewData = useSelector((state: RootState) => state.productReview);

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDialogState(false);
      }}
      fullWidth
    >
      <DialogTitle>
        {reviewData.isNoOwnerReview ? "Write a" : "Update "} review
      </DialogTitle>
      <IconButton
        onClick={() => {
          handleDialogState(false);
        }}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent sx={{ padding: "0 24px" }}>
        <form>
          <Box>
            <Box display="flex">
              <Typography variant="h4" fontWeight="bold">
                Overall Rating
              </Typography>
            </Box>
            <Rating
              name="rating"
              value={newReview.rating}
              size="medium"
              sx={{ mt: "8px" }}
              onChange={(event, newValue) => {
                handleReviewChange("rating", newValue);
              }}
            />
          </Box>
          <Box>
            <Box display="flex" my="8px">
              <Typography variant="h4" fontWeight="bold">
                Review title
              </Typography>
              <Typography variant="h4" color="error">
                &nbsp; *
              </Typography>
            </Box>
            <FormControl fullWidth>
              <FormLabel></FormLabel>
              <OutlinedInput
                name="title"
                value={newReview.title}
                fullWidth
                required
                error={!!newReviewError.title}
                placeholder="Review title here"
                onChange={(event) => {
                  handleReviewChange(event.target.name, event.target.value);
                }}
              />
              {!!newReviewError.title && (
                <FormHelperText error>{newReviewError.title}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb="8px">
            <Box display="flex" my="8px">
              <Typography variant="h4" fontWeight="bold">
                Product review
              </Typography>
              <Typography variant="h4" color="error">
                &nbsp; *
              </Typography>
            </Box>
            <FormControl fullWidth>
              <FormLabel></FormLabel>
              <OutlinedInput
                name="review"
                value={newReview.review}
                multiline
                error={!!newReviewError.review}
                rows={8}
                fullWidth
                required
                placeholder="Write a review here"
                onChange={(event) => {
                  handleReviewChange(event.target.name, event.target.value);
                }}
              />
              {!!newReviewError.review && (
                <FormHelperText error>{newReviewError.review}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleDialogState(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleSubmitButtonClick(newReview);
          }}
        >
          {reviewData.isNoOwnerReview ? "Submit" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
