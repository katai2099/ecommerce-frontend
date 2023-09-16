import { IPaginationResponse } from "./common";

export interface IReview {
  id: number;
  rating: number;
  title: string;
  review: string;
  reviewDate: string;
  updatedDate: string;
  reviewer: string;
}

export class Review implements IReview {
  constructor(
    public id = 0,
    public rating = 0,
    public title = "",
    public review = "",
    public reviewDate = "",
    public updatedDate = "",
    public reviewer = ""
  ) {}
}

export interface INewReview {
  rating: number;
  title: string;
  review: string;
}

export class NewReview implements INewReview {
  constructor(public rating = 0, public title = "", public review = "") {}
}

export interface IProductReview {
  ownerReview: IReview;
  othersReview: IPaginationResponse<IReview>;
}
