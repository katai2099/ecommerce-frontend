import styled from "@emotion/styled";
import { DoneAll, LocalShipping, Paid, Settings } from "@mui/icons-material";
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
  Paper,
  StepConnector,
  StepIconProps,
  styled as materialStyle,
  stepConnectorClasses,
} from "@mui/material";

import { ReactNode } from "react";

export const AppBox = materialStyle(Box)(({ theme }) => ({
  maxWidth: "1280px",
  minHeight: "84vh",
  padding: "40px 24px",
  [theme.breakpoints.down("sm")]: {
    padding: "40px 0px",
  },
  margin: "80px auto 0",
}));

export const OrderAccordion = styled(Accordion)(({ theme }) => ({
  ...theme,
  padding: "8px 16px",
  margin: "1rem 0",
}));

export const FlexBox = styled(Box)(({ theme }) => ({
  ...theme,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
}));

export const AccountPaper = styled(Paper)(({ theme }) => ({
  ...theme,
  marginBottom: "8px",
  padding: "8px 12px",
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

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

export const MobileColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    width: 6,
    marginLeft: -12,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  }),
}));

export function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <Paid />,
    2: <Settings />,
    3: <LocalShipping />,
    4: <DoneAll />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}
