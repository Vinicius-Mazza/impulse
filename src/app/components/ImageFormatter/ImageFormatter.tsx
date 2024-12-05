import React, { useState, useRef } from "react";
import { Flex, Image } from "@chakra-ui/react";

interface ImageFormatterProps {
  src: string;
  aspectRatio?: string;
  widthCalc: number;
  heightCalc: number;
}

export const ImageFormatter: React.FC<ImageFormatterProps> = ({
  src,
  aspectRatio,
  widthCalc,
  heightCalc,
}) => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.target as HTMLImageElement;
    const imageWidth = image.naturalWidth - widthCalc;
    setImageDimensions({ width: imageWidth, height: heightCalc });
  };

  return (
    <Flex wrap="wrap">
      <Image
        ref={imageRef}
        onLoad={handleImageLoad}
        width={imageDimensions.width}
        height={imageDimensions.height}
        aspectRatio={aspectRatio}
        borderRadius="2xl"
        mb={0.8}
        src={src}
        alt="postImage"
      />
    </Flex>
  );
};
