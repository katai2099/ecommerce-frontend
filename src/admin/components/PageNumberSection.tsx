import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { ListLoadProps } from "../../client/components/ProductList";

interface PageNumberSectionProps {
  currentPageTotalItem: number;
  totalPage: number;
  totalItem: number;
  page: number;
  itemName: string;
  handleLoadMoreClick: () => void;
}

export const PageNumberSection = ({
  currentPageTotalItem,
  totalPage,
  totalItem,
  page,
  firstLoad,
  itemName,
  handleLoadMoreClick,
}: PageNumberSectionProps & ListLoadProps) => {
  const currentPageItem =
    currentPageTotalItem < 20 && page === totalPage
      ? (page - 1) * 20 + currentPageTotalItem
      : page * 20;
  if (firstLoad || totalItem === 0) {
    return null;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt="32px"
      gap="16px"
    >
      <Box>
        <Typography fontSize="18px" mb="12px">
          Showing {currentPageItem} of {totalItem} {itemName}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min((page * 20 * 100) / totalItem, 100)}
        />
      </Box>
      {page !== totalPage && (
        <Button
          variant="contained"
          sx={{ minWidth: "15%" }}
          onClick={handleLoadMoreClick}
        >
          Load more
        </Button>
      )}
    </Box>
  );
};
