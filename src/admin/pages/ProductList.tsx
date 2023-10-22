import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { resetProductState } from "../../reducers/productReducer";
import { useAppDispatch } from "../../store/configureStore";
import { ProductTable } from "../components/product/ProductTable";

export const ProductList = () => {
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
              dispatch(resetProductState());
              navigate("/product/create");
            }}
          >
            <Add />
            New Product
          </Button>
        </Box>
        <ProductTable />
      </Paper>
    </Box>
  );
};
