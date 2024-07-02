import React from "react";

interface HighContrastTextProps {
  text: string;
  classNames?: string;
}

const HighContrastText: React.FC<HighContrastTextProps> = ({
  text,
  classNames,
}) => {
  return (
    <div className={`p-2 bg-black text-white font-sans ${classNames}`}>
      {text}
    </div>
  );
};

export default HighContrastText;
