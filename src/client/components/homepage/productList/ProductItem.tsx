import { Box, Rating, Typography, styled } from "@mui/material";
import { IProduct } from "../../../../model/product";
import { Link, useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface ProductItemProps {
  product: IProduct;
}

export const ProductItem = ({ product }: ProductItemProps) => {
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
        <Typography>{`$ ${product.price}`}</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Rating value={product.rating} size="small" readOnly />
          <Typography>(0 Reviews)</Typography>
        </Box>
      </FlexBox>
    </FlexBox>
  );
};
