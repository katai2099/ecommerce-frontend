import { Box, Button, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { submitReviewAction } from "../../../actions/productActions";
import { PageNumberSection } from "../../../admin/components/PageNumberSection";
import { IPaginationFilterData } from "../../../model/common";
import { INewReview, IReview, NewReview } from "../../../model/review";
import { RootState } from "../../../reducers/combineReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { ReviewDialog } from "../ReviewDialog";

interface ReviewItemProps {
  review: IReview;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <Box display="flex" alignItems="center" gap="16px" mb="24px">
      <Box>
        <Typography variant="h3" fontWeight="bold">
          {review.title}
        </Typography>
        <Box display="flex" alignItems="center" gap="16px">
          <Rating value={review.rating} readOnly size="small" />
          <Typography>{new Date(review.reviewDate).toDateString()}</Typography>
        </Box>
        <Typography>{review.review}</Typography>
        <Typography color="GrayText">{review.reviewer}</Typography>
      </Box>
    </Box>
  );
};

interface ReviewsProps {
  productId: number;
  ownerReview: IReview;
  otherReviews: IReview[];
  firstLoad: boolean;
  paginationFilterData: IPaginationFilterData;
  filterPage: number;
  handleLoadMoreClick: () => void;
  updateOwnerReview: (review: IReview) => void;
}

export const Reviews = (props: ReviewsProps) => {
  const {
    productId,
    ownerReview,
    otherReviews,
    firstLoad,
    paginationFilterData,
    filterPage,
    handleLoadMoreClick,
    updateOwnerReview,
  } = props;

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<INewReview>(new NewReview());

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);

  const setModalState = (isOpen: boolean) => {
    setIsReviewDialogOpen(isOpen);
  };

  const handleReviewChange = (key: string, value: any) => {
    const updatedReview = { ...newReview, [key]: value };
    setNewReview(updatedReview);
  };

  const handleModalSubmitButtonClick = (newReview: INewReview) => {
    dispatch(submitReviewAction({ productId: productId, newReview: newReview }))
      .unwrap()
      .then(() => {
        setModalState(false);
        const updatedReview: IReview = {
          ...newReview,
          reviewDate: ownerReview
            ? ownerReview.reviewDate
            : new Date().toDateString(),
          reviewer: `${user.firstname} ${user.lastname}`,
          updatedDate: new Date().toDateString(),
          id: ownerReview ? ownerReview.id : -1,
        };
        updateOwnerReview(updatedReview);
        setNewReview(new NewReview());
      });
  };

  useEffect(() => {
    if (ownerReview) {
      const newReview: INewReview = { ...ownerReview };
      setNewReview(newReview);
    }
  }, [ownerReview]);

  return (
    <Box>
      <Box mb="32px">
        {user.loggedIn ? (
          <Button
            variant="contained"
            onClick={() => {
              setModalState(true);
            }}
          >
            {ownerReview ? "Update " : "Write a"} review
          </Button>
        ) : (
          <Link to="/login">
            <Typography variant="h3" color="GrayText">
              Log in to review
            </Typography>
          </Link>
        )}
      </Box>
      {ownerReview && <ReviewItem review={ownerReview} />}
      {otherReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      {otherReviews.length === 0 && !ownerReview && (
        <Typography variant="h2">No reviews</Typography>
      )}
      <PageNumberSection
        showbar={false}
        currentPageTotalItem={
          ownerReview
            ? paginationFilterData.currentPageTotalItem + 1
            : paginationFilterData.currentPageTotalItem
        }
        totalPage={paginationFilterData.totalPage}
        totalItem={
          ownerReview
            ? paginationFilterData.totalItem + 1
            : paginationFilterData.totalItem
        }
        itemPerPage={5}
        page={filterPage}
        handleLoadMoreClick={handleLoadMoreClick}
        firstLoad={firstLoad}
        itemName={"reviews"}
        buttonTitle={"load more review"}
      />
      <ReviewDialog
        ownerReview={ownerReview}
        open={isReviewDialogOpen}
        handleDialogState={setModalState}
        handleReviewChange={handleReviewChange}
        handleSubmitButtonClick={handleModalSubmitButtonClick}
        newReview={newReview}
      />
    </Box>
  );
};
