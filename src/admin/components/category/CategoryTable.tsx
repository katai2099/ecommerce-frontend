import { Edit, MoreVert, Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoryPublish,
  setCategoryTop,
} from "../../../controllers/product";
import { clone, handleNetworkErr } from "../../../controllers/utils";
import { AdminMode } from "../../../model/admin";
import { ICategory } from "../../../model/category";
import { categoryTableHeadCells } from "../../../model/product";
import { setAdminCategories } from "../../../reducers/adminReducer";
import {
  setCategoryMode,
  setEditedCategory,
  setSelectedCategory,
} from "../../../reducers/categoryReducer";
import { RootState } from "../../../reducers/combineReducer";
import { useAppDispatch } from "../../../store/configureStore";
import { EnhancedTableHead } from "../../style/common";
import { CreateAtColumn } from "../product/ProductTable";

export interface OptionColumnProps<T> {
  item: T;
}

export const OptionColumn = ({ item }: OptionColumnProps<ICategory>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryMenuSelect = (mode: AdminMode) => {
    dispatch(setCategoryMode(mode));
    dispatch(setSelectedCategory(item));
    dispatch(setEditedCategory(item));
    handleClose();
    navigate("/category/create");
  };

  return (
    <Box>
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: -100 }}
      >
        <MenuItem
          onClick={() => {
            handleCategoryMenuSelect(AdminMode.VIEW);
          }}
        >
          <ListItemIcon>
            <Visibility fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCategoryMenuSelect(AdminMode.EDIT);
          }}
        >
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const CategoryTable = () => {
  const dispatch = useAppDispatch();
  const categories = useSelector((state: RootState) => state.admin.categories);

  function handleCategoryTopChange(checked: boolean, index: number) {
    const oldCategories = clone(categories);
    const updatedCategories = categories.map((category, idx) =>
      idx === index ? { ...category, isTop: checked } : category
    );
    dispatch(setAdminCategories(updatedCategories));
    setCategoryTop(checked, categories[index].id)
      .then(() => {})
      .catch((err) => {
        handleNetworkErr(err);
        dispatch(setAdminCategories(oldCategories));
      });
  }

  function handleCategoryPublishChange(checked: boolean, index: number) {
    const oldCategories = clone(categories);
    const updatedCategories = categories.map((category, idx) =>
      idx === index ? { ...category, publish: checked } : category
    );
    dispatch(setAdminCategories(updatedCategories));
    setCategoryPublish(checked, categories[index].id)
      .then(() => {})
      .catch((err) => {
        handleNetworkErr(err);
        dispatch(setAdminCategories(oldCategories));
      });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} size="medium">
          <EnhancedTableHead headCells={categoryTableHeadCells} />
          <TableBody>
            {categories.map((category, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell align="left" component="th">
                  <Box display="flex" alignItems="center">
                    <Box
                      mr="16px"
                      borderRadius="8px"
                      width="64px"
                      height="64px"
                    >
                      <img
                        alt=""
                        src={category.categoryImage}
                        className="img-contain"
                      />
                    </Box>
                    <Typography>{category.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">
                  <Switch
                    color="info"
                    checked={category.isTop}
                    onChange={(_, checked) => {
                      handleCategoryTopChange(checked, index);
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <Switch
                    color="success"
                    checked={category.publish}
                    onChange={(_, checked) => {
                      handleCategoryPublishChange(checked, index);
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <CreateAtColumn createdAt={category.lastModified} />
                </TableCell>
                <TableCell align="left">
                  <OptionColumn item={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
