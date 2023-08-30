import styled from "@emotion/styled";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import { CartProduct } from "./CartProduct";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export interface CartMenuProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}

export const CartMenu = ({ open, toggleDrawer }: CartMenuProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <Box sx={{ width: "max(400px)" }} role="presentation">
        <Box
          // height="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Box overflow="auto" height="calc(100vh - 140px)" padding="30px">
            <FlexBox mb="15px">
              <Typography variant="h4">Shopping Bag (4)</Typography>
              <IconButton
                onClick={() => {
                  toggleDrawer(false);
                }}
              >
                <CloseOutlined />
              </IconButton>
            </FlexBox>
            <Divider />
            <Box mt="4px">
              <CartProduct />
              <CartProduct />
              <CartProduct />
              <CartProduct />
              <CartProduct />
              <CartProduct />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Button>Checkout Now (79$)</Button>
            <Button>View Cart</Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};
