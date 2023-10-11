import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  Checkbox,
  ListItemText,
  MenuItem,
} from "@mui/material";
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

export const EAccordion = styled((props: AccordionProps) => (
  <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid rgba(0, 0, 0, .125)`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export const EAccordionSummary = styled((props: AccordionSummaryProps) => (
  <AccordionSummary {...props} />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  "& .MuiAccordionSummary-content": {
    marginLeft: 1,
  },
}));

export const EAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "8px 16px",
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export interface CheckboxMenuItemProps {
  checked: boolean;
  onClick: (checked: boolean) => void;
  value: string;
}

export const CheckboxMenuItem = ({
  checked,
  onClick,
  value,
}: CheckboxMenuItemProps) => {
  return (
    <MenuItem
      sx={{ p: 0 }}
      value={value}
      onClick={() => {
        onClick(!checked);
      }}
    >
      <Checkbox checked={checked} size="small" sx={{ pl: 0 }} />
      <ListItemText primary={value} />
    </MenuItem>
  );
};
