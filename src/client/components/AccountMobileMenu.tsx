import { Box, Drawer } from "@mui/material";
import { useSelector } from "react-redux";
import { setMobileAccountMenuOpen } from "../../reducers/accountReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { AccountSidebarMenu } from "./AccountSidebarMenu";

export const AccountMobileMenu = () => {
  const isOpen = useSelector(
    (state: RootState) => state.account.mobileMenuOpen
  );
  const dispatch = useAppDispatch();
  return (
    <Drawer
      open={isOpen}
      onClose={() => {
        dispatch(setMobileAccountMenuOpen(false));
      }}
      PaperProps={{ sx: { minWidth: "70%", maxWidth: "70%" } }}
    >
      <Box padding="48px 0px">
        <AccountSidebarMenu />
      </Box>
    </Drawer>
  );
};
