export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51MbAUnC86dzA2kF6sxQ4HDPUW3dTlrty8b5t64GkR9luS40v55NkOyHCgUZEDS6jlxCNa3mYgyzCrbnd9JahArxW00VkG4wNUr";

export const OUT_OF_STOCK_MESSAGE = "one or more products are out of stock";
export const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "ec2-16-170-227-116.eu-north-1.compute.amazonaws.com"
    : "localhost";
export const API_PORT = process.env.NODE_ENV === "production" ? 443 : 8081;

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ADMIN_ITEM_PER_PAGE = 100;
