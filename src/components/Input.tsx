import React, { Dispatch, SetStateAction } from "react";

interface InputTypes {
  label: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
}

const Input = ({ label, onChange, value }: InputTypes) => {
  return (
    <div className="relative">
      <label className="text-lg absolute top-[-12px] h-fit left-3 bg-white px-2 font-bold">
        {label}
      </label>
      <input
        onChange={onChange}
        value={value}
        className="w-full outline-none border-2 font-bold border-gray-800 p-2 pt-4 rounded-lg"
      />
    </div>
  );
};

export default Input;
