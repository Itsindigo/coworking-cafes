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
      className={`flex w-full flex-col items-start bg-cover bg-center text-start ${classNames}`}
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
