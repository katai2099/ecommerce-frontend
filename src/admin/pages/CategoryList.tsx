import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCategoryState } from "../../reducers/categoryReducer";
import { RootState } from "../../reducers/combineReducer";
import { useAppDispatch } from "../../store/configureStore";
import { CategoryTable } from "../components/category/CategoryTable";

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state: RootState) => state.admin.categories);
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
              dispatch(resetCategoryState());
              navigate("/category/create");
            }}
          >
            <Add />
            New Category
          </Button>
        </Box>
        {categories.length > 0 ? (
          <CategoryTable />
        ) : (
          <Typography variant="h2">No categories</Typography>
        )}
      </Paper>
    </Box>
  );
};
