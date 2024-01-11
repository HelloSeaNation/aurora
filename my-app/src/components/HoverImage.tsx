import React, { useState } from "react";
import { Image } from "@chakra-ui/react";

const cardImage = {
  width: "21vh",
  height: "auto",
};

function HoverImage({
  defaultImage,
  hoverImage,
}: {
  defaultImage: string;
  hoverImage: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(defaultImage);

  const handleHover = () => {
    setHovered(!hovered);
    setCurrentImage(hovered ? defaultImage : hoverImage);
  };

  return (
    <Image
      src={currentImage}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={cardImage}
    />
  );
}

export default HoverImage;
