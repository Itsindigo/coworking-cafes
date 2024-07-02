import React from "react";

interface InputBoxProps {
  label: string;
  placeholder: string;
  id: string;
}

const InputBox: React.FC<InputBoxProps> = ({ label, placeholder, id }) => {
  return (
    <div className="p-4 bg-gradient-to-r from-indigo-500 to-malachite-500 to-mal text-white shadow-lg rounded-sm">
      <label htmlFor={id} className="block text-lg font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="w-full p-3 text-black bg-white border border-malachite-200 rounded focus:outline-none focus:ring-2 focus:ring-chill-800"
        aria-label={label}
      />
    </div>
  );
};

export default InputBox;
