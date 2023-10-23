import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/combineReducer";
import {
  ColorlibConnector,
  ColorlibStepIcon,
  MobileColorlibConnector,
} from "../../styles/common";

interface OrderStatusProgressProps {
  status: string;
  isAdmin: boolean;
  onStatusUpdate: (status: string) => void;
}

const steps = ["Order placed", "Processing", "Out for delivery", "Delivered"];

export const OrderStatusProgress = ({
  status,
  isAdmin = false,
  onStatusUpdate,
}: OrderStatusProgressProps) => {
  const currentStep = steps.findIndex(
    (element) => element.toUpperCase() === status
  );
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
  const handleStatusUpdate = (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => {
    onStatusUpdate(event.target.value);
  };

  return (
    <Paper
      sx={{
        padding: "16px 32px 32px",
      }}
    >
      <Box
        mt="8px"
        mb="24px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h3">Order Details</Typography>
        {isAdmin && (
          <FormControl>
            <InputLabel></InputLabel>
            <Select
              value={status}
              onChange={handleStatusUpdate}
              sx={{ fontWeight: "bold" }}
            >
              {steps.map((step, idx) => (
                <MenuItem
                  key={step}
                  value={step.toUpperCase()}
                  disabled={idx - currentStep > 1}
                >
                  {step}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Stepper
        sx={{
          ...(matchSm && { display: "flex" }),
          ...(matchSm && { alignItems: "center" }),
        }}
        orientation={matchSm ? "vertical" : "horizontal"}
        alternativeLabel={!matchSm}
        activeStep={currentStep}
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
          {steps[currentStep]}
        </Typography>
      )}
    </Paper>
  );
};
