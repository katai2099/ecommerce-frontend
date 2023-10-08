import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

export const ECarousel = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matchSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box my="24px">
      <Carousel autoPlay={false} height="350px">
        <Paper
          sx={{
            position: "relative",
            minHeight: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 48px 0",
            bgcolor: "black",
            ...(matchSm && {
              background:
                "linear-gradient(rgba(111, 114, 113,1),rgba(111, 114, 113,0.5))",
            }),
            ...(!matchSm && {
              backgroundImage:
                "linear-gradient(rgba(34,34,34,0.3),rgba(34,34,34,0.3)),url(/image/men.jpg)",
            }),
            backgroundSize: "cover",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              color="white"
              sx={{ fontSize: { xs: "30px" } }}
            >
              Lifestyle Collection
            </Typography>
            <Typography
              variant="h1"
              color="white"
              fontWeight="bold"
              letterSpacing="-2px"
              sx={{ fontSize: { xs: "36px" }, letterSpacing: { xs: "-0.5px" } }}
            >
              Men
            </Typography>
            <Typography
              variant="h2"
              color="white"
              sx={{ fontSize: { xs: "24px" } }}
            >
              Level up your confident with our collections
            </Typography>
          </Box>

          <Button
            sx={{
              justifyItems: { xs: "flex-end" },
              position: {
                sm: "absolute",
                md: "absolute",
                lg: "absolute",
              },
              bottom: 40,
              bgcolor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "#d8d8d8",
                color: "black",
              },
            }}
            variant="contained"
            onClick={() => {
              navigate("/men");
            }}
          >
            Shop now
          </Button>
        </Paper>
        <Paper
          sx={{
            position: "relative",
            minHeight: "350px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 48px 0",
            bgcolor: "black",
            ...(matchSm && {
              background:
                "linear-gradient(to right,rgba(120, 120, 120, 0.7),rgba(120, 120, 120, 0.4))",
            }),
            ...(!matchSm && {
              backgroundImage:
                "linear-gradient(to right,rgba(120, 120, 120, 0.7),rgba(120, 120, 120, 0.2)),url(image/women.jpeg)",
            }),

            backgroundSize: "cover",
          }}
        >
          <Box>
            <Typography
              variant="h1"
              color="white"
              sx={{ fontSize: { xs: "30px" } }}
            >
              Lifestyle Collection
            </Typography>
            <Typography
              sx={{ fontSize: { xs: "36px" }, letterSpacing: { xs: "-0.5px" } }}
              variant="h1"
              color="white"
              fontWeight="bold"
              letterSpacing="-2px"
            >
              Women
            </Typography>
            <Typography
              variant="h2"
              color="white"
              sx={{ fontSize: { xs: "24px" } }}
            >
              Level up your confident with our collections
            </Typography>
          </Box>

          <Button
            sx={{
              justifyItems: { xs: "flex-end" },
              position: {
                sm: "absolute",
                md: "absolute",
                lg: "absolute",
              },
              bottom: 40,
              bgcolor: "white",
              color: "black",
              "&:hover": {
                bgcolor: "#d8d8d8",
                color: "black",
              },
            }}
            variant="contained"
            onClick={() => {
              navigate("/women");
            }}
          >
            Shop now
          </Button>
        </Paper>
      </Carousel>
    </Box>
  );
};
