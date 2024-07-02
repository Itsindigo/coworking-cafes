import React from "react";

interface HeroBannerProps {
  backgroundImage: string;
  header?: string;
  subheader?: string;
  children?: React.ReactNode;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  backgroundImage,
  header,
  subheader,
  children,
}) => {
  return (
    <div
      className="h-96 flex flex-col justify-center items-center text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {header && <h1 className="text-4xl font-bold text-white">{header}</h1>}
      {subheader && <h2 className="text-2xl text-white mt-2">{subheader}</h2>}
      {children}
    </div>
  );
};

export default HeroBanner;
