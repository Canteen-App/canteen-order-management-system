import React, { Dispatch, SetStateAction } from "react";

interface TextInputTypes {
  label: string;
  value: string | number;
  type?: string;
  onChange: (e: { target: { value: string } }) => void;
}

const TextInput = ({ label, onChange, value, type }: TextInputTypes) => {
  return (
    <div className="relative mt-4">
      <label className="text-lg absolute top-[-12px] h-fit left-3 bg-white px-2 font-bold">
        {label}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className="w-full outline-none border-2 font-bold border-gray-800 p-2 pt-4 rounded-lg"
      />
    </div>
  );
};

export default TextInput;
