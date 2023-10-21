import { PhotoLibraryOutlined, Upload } from "@mui/icons-material";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { ImageSection } from "../../../client/components/productDetails/ImageSection";
import { formatFileSize } from "../../../controllers/utils";
import { ProductMode } from "../../../model/product";
import { RootState } from "../../../reducers/combineReducer";
import { ProductImagePreview } from "./ProductImagePreview";

interface UploadImageSectionProps {
  onImageDrop: (file: File) => void;
  onLocalImageDelete: (idx: number) => void;
  onRemoteImageDelete: (idx: number) => void;
  files: File[];
  mode: ProductMode;
}

export const UploadImageSection = (props: UploadImageSectionProps) => {
  const selectedProduct = useSelector(
    (state: RootState) => state.product.selectedProduct
  );
  const editedProduct = useSelector(
    (state: RootState) => state.product.editedProduct
  );
  const { onImageDrop, onLocalImageDelete, onRemoteImageDelete, files, mode } =
    props;
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 3,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop(acceptedFiles) {
      for (
        let i = 0;
        i <
        Math.min(
          3 - (files.length + editedProduct.images.length),
          acceptedFiles.length
        );
        i++
      ) {
        onImageDrop(acceptedFiles[i]);
      }
    },
  });

  return (
    <>
      <FormControl fullWidth>
        <FormLabel sx={{ pb: "4px" }}>Images</FormLabel>
        {mode !== ProductMode.VIEW && (
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <Box
                height="250px"
                border="2px dashed #bbbbbb"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <PhotoLibraryOutlined sx={{ fontSize: "78px" }} />
                <Box display="flex" alignItems="center">
                  <IconButton>
                    <Upload color="primary" />
                  </IconButton>
                  <Typography>Drop your files here. or &nbsp;</Typography>
                  <Typography color="primary">Browse</Typography>
                </Box>
              </Box>
            </div>
            <Typography fontSize="12px" pt="8px" color="grayText">
              Maximum 3 files can be uploaded
            </Typography>
          </section>
        )}
      </FormControl>
      <Box width="100%" mt="24px">
        {(mode === ProductMode.CREATE || mode === ProductMode.EDIT) && (
          <>
            {editedProduct.images.map((image, index) => (
              <ProductImagePreview
                key={index}
                title={editedProduct.name}
                src={image.imageUrl}
                index={index}
                onDelete={() => {
                  onRemoteImageDelete(index);
                }}
                isLocal={false}
              />
            ))}

            {files.map((file, index) => (
              <ProductImagePreview
                key={index}
                index={index}
                src={URL.createObjectURL(file)}
                title={file.name}
                onDelete={() => {
                  onLocalImageDelete(index);
                }}
                isLocal={true}
                size={formatFileSize(file.size)}
              />
            ))}
          </>
        )}
        {mode === ProductMode.VIEW && (
          <ImageSection images={selectedProduct.images} />
        )}
      </Box>
    </>
  );
};
