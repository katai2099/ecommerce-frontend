import { SentimentDissatisfied } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetCheckoutState } from "../../reducers/checkoutReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AppBox } from "../../styles/common";
import { OUT_OF_STOCK_MESSAGE } from "../../utils/constant";

export const OrderFailure = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const outOfStock = location.state;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(resetCheckoutState());
    if (!outOfStock) {
      navigate("/", { replace: true });
    }
  }, []);
  return (
    <AppBox>
      {outOfStock && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <SentimentDissatisfied color="error" sx={{ fontSize: "80px" }} />
          <Typography variant="h1">Transaction Failed</Typography>
          <Typography variant="h2" color="grayText">
            {OUT_OF_STOCK_MESSAGE}
          </Typography>
        </Box>
      )}
    </AppBox>
  );
};
