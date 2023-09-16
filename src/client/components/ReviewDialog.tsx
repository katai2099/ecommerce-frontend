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
import { INewReview, IReview } from "../../model/review";

interface ReviewDialogProps {
  ownerReview: IReview;
  open: boolean;
  handleModalState: (isOpen: boolean) => void;
  handleReviewChange: (key: string, value: any) => void;
  handleSubmitButtonClick: (newReview: INewReview) => void;
  newReview: INewReview;
}

export const ReviewDialog = ({
  ownerReview,
  open,
  handleModalState,
  handleReviewChange,
  handleSubmitButtonClick,
  newReview,
}: ReviewDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleModalState(false);
      }}
      fullWidth
    >
      <DialogTitle>{ownerReview ? "Update " : "Write a"} review</DialogTitle>
      <IconButton
        onClick={() => {
          handleModalState(false);
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
              <Typography variant="h4" color="error">
                &nbsp; *
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
                placeholder="Review title here"
                onChange={(event) => {
                  handleReviewChange(event.target.name, event.target.value);
                }}
              />
              <FormHelperText error>required</FormHelperText>
            </FormControl>
          </Box>
          <Box>
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
                rows={8}
                fullWidth
                required
                placeholder="Write a review here"
                onChange={(event) => {
                  handleReviewChange(event.target.name, event.target.value);
                }}
              />
              <FormHelperText error>required</FormHelperText>
            </FormControl>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={() => {
            handleModalState(false);
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
