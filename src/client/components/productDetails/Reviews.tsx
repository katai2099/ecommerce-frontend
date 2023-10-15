import { Close } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PageNumberSection } from "../../../admin/components/PageNumberSection";
import { deleteReview, submitReview } from "../../../controllers/product";
import { IPaginationFilterData } from "../../../model/common";
import { INewReview, IReview, NewReview, Review } from "../../../model/review";
import { RootState } from "../../../reducers/combineReducer";
import { setOwnerReview } from "../../../reducers/productReviewReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { ReviewDialog } from "../ReviewDialog";
import { ProductReviewSkeletonLoading } from "../SkeletonLoading";

interface ReviewItemProps {
  review: IReview;
  isOwner?: boolean;
}

const ReviewItem = ({ review, isOwner = false }: ReviewItemProps) => {
  const handleReviewDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteReview(review.id).catch((err) => {});
  };
  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        width="80%"
        alignItems="center"
      >
        <Typography variant="h3" fontWeight="bold">
          {review.title}
        </Typography>
        {isOwner && (
          <IconButton size="small" onClick={handleReviewDelete}>
            <Close fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Box display="flex" alignItems="center" gap="16px">
        <Rating value={review.rating} readOnly size="small" />
        <Typography>{new Date(review.reviewDate).toDateString()}</Typography>
      </Box>
      <Typography>{review.review}</Typography>
      <Typography color="GrayText">{review.reviewer}</Typography>
    </Box>
  );
};

interface ReviewsProps {
  productId: number;
  firstLoad: boolean;
  paginationFilterData: IPaginationFilterData;
  filterPage: number;
  handleLoadMoreClick: () => void;
}

export const Reviews = (props: ReviewsProps) => {
  const {
    productId,
    firstLoad,
    paginationFilterData,
    filterPage,
    handleLoadMoreClick,
  } = props;

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState<boolean>(false);
  const [newReview, setNewReview] = useState<INewReview>(new NewReview());
  const [newReviewError, setNewReviewError] = useState<INewReview>(
    new NewReview()
  );

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const reviewData = useSelector((state: RootState) => state.productReview);
  const ownerReview = reviewData.ownerReview;
  const otherReviews = reviewData.productReviews;
  const setModalState = (isOpen: boolean) => {
    setIsReviewDialogOpen(isOpen);
  };

  const handleReviewChange = (key: string, value: any) => {
    const updatedReview = { ...newReview, [key]: value };
    setNewReview(updatedReview);
    if (key !== "rating") {
      const updatedNewReviewError = { ...newReviewError, [key]: "" };
      setNewReviewError(updatedNewReviewError);
    }
  };

  const handleModalSubmitButtonClick = (newReview: INewReview) => {
    const error = new NewReview();
    let isReviewEmpty = false;
    if (newReview.review.trim().length === 0) {
      isReviewEmpty = true;
      error.review = "Review is required";
    }
    if (newReview.title.trim().length === 0) {
      isReviewEmpty = true;
      error.title = "Title is required";
    }
    if (isReviewEmpty) {
      setNewReviewError(error);
      return;
    }
    submitReview(productId, newReview).then((reviewId) => {
      setModalState(false);
      const updatedReview: IReview = {
        ...newReview,
        reviewDate: reviewData.isNoOwnerReview
          ? new Date().toDateString()
          : ownerReview.reviewDate,
        reviewer: `${user.firstname} ${user.lastname}`,
        updatedDate: new Date().toDateString(),
        id: reviewData.isNoOwnerReview ? Number(reviewId) : ownerReview.id,
      };
      dispatch(setOwnerReview(updatedReview));
    });
  };

  useEffect(() => {
    if (!reviewData.isNoOwnerReview) {
      const newReview: INewReview = { ...ownerReview };
      setNewReview(newReview);
    } else {
      setNewReview(new Review());
    }
  }, [ownerReview]);

  if (reviewData.isReviewsLoading) {
    return <ProductReviewSkeletonLoading amount={2} />;
  }

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
            {!reviewData.isNoOwnerReview ? "Update " : "Write a"} review
          </Button>
        ) : (
          <Link to="/login">
            <Typography variant="h3" color="GrayText">
              Log in to review
            </Typography>
          </Link>
        )}
      </Box>
      {user.loggedIn && !reviewData.isNoOwnerReview && (
        <ReviewItem review={ownerReview} isOwner={true} />
      )}
      {otherReviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
      {otherReviews.length === 0 && reviewData.isNoOwnerReview && (
        <Typography variant="h2">No reviews yet</Typography>
      )}
      <PageNumberSection
        showbar={false}
        currentPageTotalItem={
          reviewData.isNoOwnerReview
            ? paginationFilterData.currentPageTotalItem
            : paginationFilterData.currentPageTotalItem + 1
        }
        totalPage={paginationFilterData.totalPage}
        totalItem={
          reviewData.isNoOwnerReview
            ? paginationFilterData.totalItem
            : paginationFilterData.totalItem + 1
        }
        itemPerPage={5}
        page={filterPage}
        handleLoadMoreClick={handleLoadMoreClick}
        firstLoad={firstLoad}
        itemName={"reviews"}
        buttonTitle={"load more review"}
      >
        <ProductReviewSkeletonLoading amount={1} />
      </PageNumberSection>
      <ReviewDialog
        open={isReviewDialogOpen}
        handleDialogState={setModalState}
        handleReviewChange={handleReviewChange}
        handleSubmitButtonClick={handleModalSubmitButtonClick}
        newReview={newReview}
        newReviewError={newReviewError}
      />
    </Box>
  );
};
