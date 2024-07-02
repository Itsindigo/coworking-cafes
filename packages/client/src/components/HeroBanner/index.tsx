import React from "react";

interface HeroBannerProps {
  backgroundImage?: string;
  Header?: React.ReactNode;
  Subheader?: React.ReactNode;
  classNames?: string;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage,
  Header,
  Subheader,
  classNames,
}) => {
  return (
    <div
      className={`w-full flex flex-col items-start text-start bg-cover bg-center ${classNames}`}
      style={
        backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}
      }
    >
      {Header}
      {Subheader}
    </div>
  );
};

export default HeroBanner;
