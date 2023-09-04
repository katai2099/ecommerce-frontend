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
import { ProductMode } from "../../../model/product";
import { RootState } from "../../../reducers/combineReducer";
import {
  ProductImagePreview,
  ProductRemoteImagePreview,
} from "./ProductImagePreview";

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
    accept: {
      "image/*": [],
    },
    onDrop(acceptedFiles) {
      acceptedFiles.map((file) => onImageDrop(file));
    },
  });

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>
          {mode === ProductMode.VIEW ? "Images" : "Add Images"}
        </FormLabel>
        {mode !== ProductMode.VIEW && (
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <Box
                height="340px"
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
          </section>
        )}
      </FormControl>
      <Box width="100%" mt="24px">
        {(mode === ProductMode.CREATE || mode === ProductMode.EDIT) && (
          <>
            {editedProduct.images.map((image, index) => (
              <ProductRemoteImagePreview
                title={editedProduct.name}
                fileUrl={image.imageUrl}
                index={index}
                onRemoteFileDelete={() => {
                  onRemoteImageDelete(index);
                }}
              />
            ))}

            {files.map((file, index) => (
              <ProductImagePreview
                file={file}
                index={index}
                onLocalFileDelete={() => {
                  onLocalImageDelete(index);
                }}
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
