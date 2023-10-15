import {
  Paper,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import {
  ColorlibConnector,
  ColorlibStepIcon,
  MobileColorlibConnector,
} from "../../styles/common";

interface OrderStatusProgressProps {
  status: string;
}

const steps = ["Order placed", "Processing", "Out for delivery", "Delivered"];

export const OrderStatusProgress = ({ status }: OrderStatusProgressProps) => {
  const step = steps.findIndex((element) => element.toUpperCase() === status);
  const orderDetailLoading = useSelector(
    (state: RootState) => state.account.selectedOrderLoading
  );
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));

  if (orderDetailLoading) {
    return (
      <Paper sx={{ padding: "16px 32px 32px" }}>
        <Skeleton
          variant="rectangular"
          sx={{ height: { xs: "300px", sm: "180px" } }}
        />
      </Paper>
    );
  }
  return (
    <Paper
      sx={{
        padding: "16px 32px 32px",
      }}
    >
      <Typography variant="h3" mb="24px">
        Order Details
      </Typography>

      <Stepper
        sx={{
          ...(matchSm && { display: "flex" }),
          ...(matchSm && { alignItems: "center" }),
        }}
        orientation={matchSm ? "vertical" : "horizontal"}
        alternativeLabel={!matchSm}
        activeStep={step}
        connector={
          matchSm ? <MobileColorlibConnector /> : <ColorlibConnector />
        }
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              sx={{ ...(matchSm && { padding: 0 }) }}
            >
              {!matchSm && label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {matchSm && (
        <Typography
          pt="16px"
          textAlign="center"
          fontSize="16px"
          fontWeight="bold"
        >
          {steps[step]}
        </Typography>
      )}
    </Paper>
  );
};
