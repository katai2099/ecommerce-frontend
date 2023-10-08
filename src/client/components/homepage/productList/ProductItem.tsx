import { Box, Rating, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { formatPrice } from "../../../../controllers/utils";
import { ProductProps } from "../../../../model/product";

const FlexBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProductItem = ({ product }: ProductProps) => {
  return (
    <FlexBox>
      <Link to={`/products/${product.id}`}>
        <FlexBox>
          <img className="img-contain" src={product.images[0].imageUrl} />
        </FlexBox>
      </Link>
      <FlexBox>
        <Link to={`/products/${product.id}`} className="nav-item">
          <Typography color="primary">{product.name}</Typography>
        </Link>
        <Typography>{formatPrice(product.price)}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating value={product.rating} size="small" readOnly />
          <Typography>&nbsp;({product.totalReview} reviews)</Typography>
        </Box>
      </FlexBox>
    </FlexBox>
  );
};
