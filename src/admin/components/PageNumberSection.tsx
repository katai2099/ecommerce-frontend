import { Box, Button, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { ListLoadProps } from "../../client/components/ProductList";

interface PageNumberSectionProps {
  currentPageTotalItem: number;
  totalPage: number;
  totalItem: number;
  itemPerPage: number;
  page: number;
  itemsLoading?: boolean;
  itemName?: string;
  showbar?: boolean;
  buttonTitle?: string;
  handleLoadMoreClick: () => void;
  children?: React.ReactNode | React.ReactNode[];
}

export const PageNumberSection = ({
  currentPageTotalItem,
  totalPage,
  totalItem,
  itemPerPage,
  page,
  firstLoad,
  itemsLoading = false,
  itemName = "",
  showbar = true,
  buttonTitle = "Load more",
  handleLoadMoreClick,
  children = null,
  error = false,
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
      {!firstLoad && itemsLoading && children}
      {!itemsLoading && !error && (
        <>
          {showbar && (
            <Box>
              <Typography fontSize="18px" mb="12px">
                Showing {currentPageItem} of {totalItem} {itemName}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min((page * itemPerPage * 100) / totalItem, 100)}
              />
            </Box>
          )}
          {page !== totalPage && totalPage !== 0 && (
            <Button
              variant="contained"
              sx={{ minWidth: "15%" }}
              onClick={handleLoadMoreClick}
            >
              {buttonTitle}
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
