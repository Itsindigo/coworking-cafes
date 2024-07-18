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
      <div className="to-malachite-500 rounded-sm bg-gradient-to-r from-indigo-500 p-4 text-white shadow-lg">
        <label htmlFor={id} className="mb-2 block text-lg font-bold">
          {label}
        </label>
        <input
          type="text"
          id={id}
          placeholder={placeholder}
          className="border-malachite-200 focus:ring-malachite-800 mb-2 w-full rounded border bg-white p-3 text-black focus:outline-none focus:ring-2"
          aria-label={label}
        />
        <TextLink to="/location/create">Can't find your location?</TextLink>
      </div>
    </div>
  );
};

export default InputBox;
