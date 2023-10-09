import { Box } from "@mui/material";
import { useState } from "react";
import { IImage } from "../../../model/product";

interface ImageSectionProps {
  images: IImage[];
}

export const ImageSection = ({ images }: ImageSectionProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return images.length > 0 ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={images[selectedIndex].imageUrl}
        className="img-contain img-300"
        style={{ marginBottom: "24px" }}
      />
      <Box display="flex" justifyItems="center" alignItems="center" gap="16px">
        {images.map((image, idx) => (
          <Box
            key={idx}
            width="64px"
            height="64px"
            border={
              idx === selectedIndex ? "1px solid #000000" : "1px solid #dfdfdf"
            }
            onClick={() => {
              setSelectedIndex(idx);
            }}
          >
            <img width="auto" src={image.imageUrl} className="img-contain" />
          </Box>
        ))}
      </Box>
    </Box>
  ) : null;
};
