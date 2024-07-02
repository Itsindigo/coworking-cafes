import React from "react";

interface SVGImageProps {
  src: string;
}

export const SVGImage: React.FC<SVGImageProps> = ({ src }) => {
  return (
    <div>
      <img src={src} alt="Logo" width="48" height="48" />
    </div>
  );
};

export default SVGImage;
