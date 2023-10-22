import { Add, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DialogProps } from "../../client/components/NewAddressDialog";
import { ETextField } from "../../client/components/common/ETextField";
import { LoadingButton } from "../../client/components/common/LoadingButton";
import { addNewSize, updateSize } from "../../controllers/product";
import { isStringEmpty } from "../../controllers/utils";
import { AdminMode } from "../../model/admin";
import { ISize, Size } from "../../model/size";
import { addAdminSizes, setAdminSizes } from "../../reducers/adminReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { SizeTable } from "../components/size/SizeTable";

interface NewSizeDialogProps {
  error: string;
  loading: boolean;
  selectedSize: ISize;
  handleChange: (field: string, value: any) => void;
  onSubmit: () => void;
}

export const NewSizeDialog = ({
  error = "",
  open,
  handleDialogState,
  loading,
  selectedSize,
  handleChange,
  onSubmit,
}: DialogProps & NewSizeDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        handleDialogState(false);
      }}
      PaperProps={{ sx: { minWidth: { xs: "70%", md: "450px" } } }}
    >
      <DialogTitle>Size</DialogTitle>
      <IconButton
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={() => {
          handleDialogState(false);
        }}
      >
        <Close />
      </IconButton>
      <DialogContent>
        <ETextField
          fullWidth
          label="Name"
          name="name"
          value={selectedSize.name}
          error={error}
          onChange={(event) => {
            handleChange(event.currentTarget.name, event.currentTarget.value);
          }}
        />
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                name="publish"
                color="success"
                checked={selectedSize.publish}
                onChange={(event) => {
                  handleChange(
                    event.currentTarget.name,
                    event.currentTarget.checked
                  );
                }}
              />
            }
            label="Publish"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ paddingRight: "24px", paddingBottom: "16px" }}>
        <Button
          onClick={() => {
            handleDialogState(false);
          }}
          color="primary"
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          title={"submit"}
          onClick={() => {
            onSubmit();
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export const SizeList = () => {
  const [selectedSize, setSelectedSize] = useState<ISize>(new Size());
  const adminSizes = useSelector((state: RootState) => state.admin.sizes);
  const [sizeError, setSizeError] = useState<string>("");
  const [mode, setMode] = useState<AdminMode>(AdminMode.CREATE);
  const [submit, setSubmit] = useState<boolean>(false);
  const [newSizeDialogOpen, setNewSizeDialogOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleNewSizeDialogState = (state: boolean) => {
    setNewSizeDialogOpen(state);
  };

  const handleSizeEdit = (index: number) => {
    setMode(AdminMode.EDIT);
    setSelectedSize(adminSizes[index]);
    handleNewSizeDialogState(true);
  };

  const handleSizeUpdate = (field: string, value: any) => {
    if (field === "name" && !!sizeError) {
      setSizeError("");
    }
    setSelectedSize((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isStringEmpty(selectedSize.name)) {
      setSizeError("Name is required");
      return;
    }
    setSubmit(true);
    if (mode === AdminMode.CREATE) {
      addNewSize(selectedSize)
        .then((res) => {
          dispatch(addAdminSizes(res));
          handleNewSizeDialogState(false);
        })
        .catch((err) => {})
        .finally(() => setSubmit(false));
    } else if (mode === AdminMode.EDIT) {
      updateSize(selectedSize)
        .then((res) => {
          const id = Number(res);
          const updatedSizes = adminSizes.map((size) =>
            size.id === id ? res : size
          );
          dispatch(setAdminSizes(updatedSizes));
          handleNewSizeDialogState(false);
        })
        .catch((err) => {})
        .finally(() => setSubmit(false));
    }
  };

  return (
    <Box>
      <Paper sx={{ p: "48px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="24px"
        >
          <Typography variant="h3">List</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setSelectedSize(new Size());
              setMode(AdminMode.CREATE);
              handleNewSizeDialogState(true);
            }}
          >
            <Add />
            New Size
          </Button>
        </Box>
        <SizeTable onEdit={handleSizeEdit} />
      </Paper>
      <NewSizeDialog
        loading={submit}
        selectedSize={selectedSize}
        open={newSizeDialogOpen}
        handleDialogState={handleNewSizeDialogState}
        handleChange={handleSizeUpdate}
        onSubmit={handleSubmit}
        error={sizeError}
      />
    </Box>
  );
};
