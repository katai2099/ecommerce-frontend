import { Dialog } from "@mui/material";
import { Login } from "./Login";

export interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Login modalClose={onClose} />
    </Dialog>
  );
};
