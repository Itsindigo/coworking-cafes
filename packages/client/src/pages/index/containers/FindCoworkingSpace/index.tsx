import React from "react";
import InputBox from "../../components/InputBox";

export const FindCoworkingSpace: React.FC = () => {
  return (
    <InputBox
      label="Find a space near you"
      placeholder="Start typing your location..."
      id="location"
    />
  );
};
