import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resetCategoryState } from "../../reducers/categoryReducer";
import { useAppDispatch } from "../../store/configureStore";
import { CategoryTable } from "../components/category/CategoryTable";

export const CategoryList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
        <CategoryTable />
      </Paper>
    </Box>
  );
};
