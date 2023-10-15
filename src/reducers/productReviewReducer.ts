import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  deleteReviewAction,
  getProductReviewsAction,
  getProductUserReviewAction,
} from "../actions/productActions";
import {
  IProductReviewReduxState,
  ProductReviewReduxState,
} from "../model/product";
import { IReview, Review } from "../model/review";

const initialState: IProductReviewReduxState = new ProductReviewReduxState();

const productReviewSlice = createSlice({
  name: "product_reviews",
  initialState,
  reducers: {
    setOwnerReview(state, action: PayloadAction<IReview>) {
      return { ...state, ownerReview: action.payload, isNoOwnerReview: false };
    },
  },
  extraReducers(builder) {
    builder.addCase(getProductReviewsAction.pending, (state) => {
      return { ...state, isReviewsLoading: true, isReviewsError: false };
    });
    builder.addCase(getProductReviewsAction.fulfilled, (state, payload) => {
      const res = payload.payload;
      let reviews;
      if (res.currentPage !== 1) {
        reviews = [...state.productReviews, ...res.data];
      } else {
        reviews = res.data;
      }
      return { ...state, productReviews: reviews, isReviewsLoading: false };
    });
    builder.addCase(getProductReviewsAction.rejected, (state) => {
      return { ...state, isReviewsLoading: false, isReviewsError: true };
    });
    builder.addCase(getProductUserReviewAction.fulfilled, (state, payload) => {
      return { ...state, ownerReview: payload.payload, isNoOwnerReview: false };
    });
    builder.addCase(getProductUserReviewAction.rejected, (state, payload) => {
      if (
        payload.payload instanceof AxiosError &&
        payload.payload.response?.data.status === 404
      ) {
        return { ...state, isNoOwnerReview: true };
      }
      return state;
    });
    builder.addCase(deleteReviewAction.fulfilled, (state) => {
      return {
        ...state,
        isNoOwnerReview: true,
        ownerReview: new Review(),
        isReviewsLoading: false,
      };
    });
    builder.addCase(deleteReviewAction.pending, (state) => {
      return { ...state, isReviewsLoading: true };
    });
    builder.addCase(deleteReviewAction.rejected, (state) => {
      return { ...state, isReviewsLoading: false };
    });
  },
});

export const { setOwnerReview } = productReviewSlice.actions;
export default productReviewSlice.reducer;
