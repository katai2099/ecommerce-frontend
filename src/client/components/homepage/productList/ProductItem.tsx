import { Box, Rating, Typography, styled } from "@mui/material";
import { IProduct } from "../../../../model/product";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <FlexBox>
      <Box>
        <img
          width="auto"
          src={product.images[0].imageUrl}
          className="img-contain"
        />
      </Box>
      <FlexBox>
        <Typography
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/products/${product.id}`);
          }}
        >
          {product.name}
        </Typography>
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
