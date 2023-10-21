import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ProductImagePreviewProps {
  src: string;
  title: string;
  index: number;
  onDelete: () => void;
  isLocal: boolean;
  size?: string;
}

export const ProductImagePreview: React.FC<ProductImagePreviewProps> = ({
  src,
  title,
  index,
  onDelete,
  isLocal,
  size = 72,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid #e3e9f7"
      borderRadius="4px"
      width="100%"
      mb="8px"
    >
      <Box display="flex">
        <Box width="72px" height="72px" padding="8px">
          <img alt="" src={src} className="img-contain" />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography>{isLocal ? title : `${title} ${index + 1}`}</Typography>
          <Typography>{isLocal ? size : "Remote file"}</Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          onDelete();
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Box>
  );
};
