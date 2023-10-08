import { MarkEmailReadOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";

export const Subscribe = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <Box mt="80px 0" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlined fontSize="large" />
      </IconButton>
      <Typography variant="h5">Subscribe To Our Newsletter</Typography>
      <Typography>
        and receive 20$ coupon for your first order when you checkout
      </Typography>
      <Box
        width="75%"
        p="2px 4px"
        m="16px auto"
        display="flex"
        alignItems="center"
        bgcolor="#f2f2f2"
      >
        <InputBase
          fullWidth
          placeholder="Enter email"
          value={email}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            setEmail(event.currentTarget.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button
          sx={{
            p: "10px",
            ":hover": { cursor: "pointer" },
            textTransform: "unset",
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};
