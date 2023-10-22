import { Box } from "@mui/material";
import { ImageSection } from "../../client/components/productDetails/ImageSection";
import { formatFileSize } from "../../controllers/utils";
import { AdminMode } from "../../model/admin";
import { IImage } from "../../model/product";
import { ProductImagePreview } from "./product/ProductImagePreview";

interface Images {
  url: string;
  title: string;
}

interface ImagePreviewSectionProps {
  onLocalImageDelete: (idx: number) => void;
  onRemoteImageDelete: (idx: number) => void;
  mode: AdminMode;
  files?: File[];
  images?: Images[];
}

export const ImagePreviewSection = ({
  onLocalImageDelete,
  onRemoteImageDelete,
  mode,
  files = [],
  images = [],
}: ImagePreviewSectionProps) => {
  const imageSectionImages = images.map(
    (image, idx) => ({ id: idx, imageUrl: image.url } as IImage)
  );
  return (
    <Box width="100%" mt="24px">
      {(mode === AdminMode.CREATE || mode === AdminMode.EDIT) && (
        <>
          {images.map((image, index) => (
            <ProductImagePreview
              key={index}
              title={image.title}
              src={image.url}
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
      {mode === AdminMode.VIEW && <ImageSection images={imageSectionImages} />}
    </Box>
  );
};
