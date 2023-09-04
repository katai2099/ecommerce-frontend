import { DeleteOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

interface ProductImagePreviewProps {
  file: File;
  index: number;
  onLocalFileDelete: (idx: number) => void;
}

interface ProductRemoteImagePreviewProps {
  fileUrl: string;
  index: number;
  onRemoteFileDelete: (idx: number) => void;
  title: string;
}

function formatFileSize(bytes: number, decimalPoint: number = 2) {
  if (bytes === 0) return "0 Bytes";
  var k = 1000,
    dm = decimalPoint,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const ProductImagePreview = ({
  file,
  index,
  onLocalFileDelete,
}: ProductImagePreviewProps) => {
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
          <img alt="" src={URL.createObjectURL(file)} className="img-contain" />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography>{file.name}</Typography>
          <Typography>{formatFileSize(file.size)}</Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          onLocalFileDelete(index);
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Box>
  );
};

export const ProductRemoteImagePreview = ({
  fileUrl,
  index,
  title,
  onRemoteFileDelete,
}: ProductRemoteImagePreviewProps) => {
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
          <img alt="" src={fileUrl} className="img-contain" />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography>{`${title} ${index + 1}`}</Typography>
          <Typography>Remote file</Typography>
        </Box>
      </Box>
      <IconButton
        onClick={() => {
          onRemoteFileDelete(index);
        }}
      >
        <DeleteOutline />
      </IconButton>
    </Box>
  );
};
