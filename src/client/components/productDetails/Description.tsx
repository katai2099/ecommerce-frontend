import {
  Box,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers/combineReducer";

interface DescriptionProps {
  description: string;
}

export const Description = ({ description }: DescriptionProps) => {
  const isProductLoading = useSelector(
    (state: RootState) => state.productDetail.isLoading
  );
  const theme = useTheme();
  const matchMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box>
      <Typography fontWeight="bold">
        {isProductLoading ? (
          <Skeleton width={matchMobile ? "30%" : "15%"} />
        ) : (
          `Description`
        )}
      </Typography>
      <Typography pt="8px" color="gray" fontSize="16px">
        {isProductLoading ? <Skeleton /> : description}
      </Typography>
    </Box>
  );
};
