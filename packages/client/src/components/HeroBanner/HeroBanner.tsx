import React from "react";

interface HeroBannerProps {
  backgroundImage: string;
  Header?: React.ReactNode;
  Subheader?: React.ReactNode;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage,
  Header,
  Subheader,
}) => {
  return (
    <div
      className="min-h-64 w-full h-[600px] flex flex-col items-start text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {Header}
      {Subheader}
    </div>
  );
};

export default HeroBanner;
