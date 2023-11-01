import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { updateSize } from "../../../controllers/product";
import { clone, showSnackBar } from "../../../controllers/utils";
import { sizeTableHeadCells } from "../../../model/product";
import { setAdminSizes } from "../../../reducers/adminReducer";
import { RootState } from "../../../reducers/combineReducer";
import { setLoading } from "../../../reducers/guiReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { EnhancedTableHead } from "../../style/common";
import { CreateAtColumn } from "../product/ProductTable";

interface SizeTableProps {
  onEdit: (index: number) => void;
}

export const SizeTable = ({ onEdit }: SizeTableProps) => {
  const sizes = useSelector((state: RootState) => state.admin.sizes);
  const dispatch = useAppDispatch();
  const handleSizePublishChange = (checked: boolean, index: number) => {
    const oldSizes = clone(sizes);
    const updatedSizes = sizes.map((size, idx) =>
      idx === index ? { ...size, publish: checked } : size
    );
    dispatch(setAdminSizes(updatedSizes));
    dispatch(setLoading(true));
    updateSize(updatedSizes[index])
      .then(() => {})
      .catch(() => {
        showSnackBar("Update size failed", "error");
        dispatch(setAdminSizes(oldSizes));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <EnhancedTableHead headCells={sizeTableHeadCells} />
          <TableBody>
            {sizes.map((size, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell align="left" component="th">
                  <Typography color="initial">{size.name}</Typography>
                </TableCell>
                <TableCell align="left">
                  <Switch
                    checked={size.publish}
                    color="info"
                    onChange={(_, checked) => {
                      handleSizePublishChange(checked, index);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <CreateAtColumn createdAt={size.lastModified} />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<Edit />}
                    sx={{ textTransform: "none" }}
                    onClick={() => {
                      onEdit(index);
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
