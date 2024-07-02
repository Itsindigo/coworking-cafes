import { Link } from "@tanstack/react-router";
import React from "react";
import { TextLink } from "../../../components";

interface InputBoxProps {
  label: string;
  placeholder: string;
  id: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, id }) => {
  return (
    <div className="flex flex-col">
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-malachite-500 to-mal text-white shadow-lg rounded-sm">
        <label htmlFor={id} className="block text-lg font-bold mb-2">
          {label}
        </label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          className="w-full mb-2 p-3 text-black bg-white border border-malachite-200 rounded focus:outline-none focus:ring-2 focus:ring-malachite-800"
          aria-label={label}
        />
        <TextLink to="/location/create">Can't find your location?</TextLink>
      </div>
    </div>
  );
};

export default InputBox;
