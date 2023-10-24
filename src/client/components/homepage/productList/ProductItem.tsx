import styled from "@emotion/styled";
import { Box, Paper, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../controllers/utils";
import { ProductProps } from "../../../../model/product";

const FlexBox = styled(Box)(({ theme }) => ({
  ...theme,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

export const ProductItem = ({ product }: ProductProps) => {
  return (
    <Paper>
      <Box pt="8px">
        <Link to={`/products/${product.id}`}>
          <FlexBox bgcolor="transparent">
            <img
              className="img-contain img-300"
              src={product.images.length > 0 ? product.images[0].imageUrl : ""}
            />
          </FlexBox>
        </Link>
        <Box padding="16px">
          <Link to={`/products/${product.id}`} className="nav-item">
            <Typography color="primary">{product.name}</Typography>
          </Link>
          <Typography>{formatPrice(product.price)}</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Rating value={product.rating} size="small" readOnly />
            <Typography>&nbsp;({product.totalReview} reviews)</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
