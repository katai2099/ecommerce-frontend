import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { ReactNode } from "react";

export const AppBox = styled(Box)(({ theme }) => ({
  ...theme,
  maxWidth: "1280px",
  minHeight: "84vh",
  padding: "40px 24px",
  margin: "80px auto 0",
}));

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, index, value } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box padding="12px 16px">{children}</Box>}
    </div>
  );
};
