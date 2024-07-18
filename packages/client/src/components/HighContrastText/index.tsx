import React from "react";

interface HighContrastTextProps {
  text: string;
  classNames?: string;
}

export const HighContrastText: React.FC<HighContrastTextProps> = ({
  text,
  classNames,
}) => {
  return (
    <div className={`bg-black p-2 font-sans text-white ${classNames}`}>
      {text}
    </div>
  );
};

export default HighContrastText;
