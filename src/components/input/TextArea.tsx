import React, { Dispatch, SetStateAction } from "react";

interface TextAreaTypes {
  label: string;
  value: string;
  onChange: (e: {target: {value: string}}) => void
}

const TextArea = ({ label, onChange, value }: TextAreaTypes) => {
  return (
    <div className="relative mt-4">
      <label className="text-lg absolute top-[-12px] h-fit left-3 bg-white px-2 font-bold">
        {label}
      </label>
      <textarea
        onChange={onChange}
        value={value}
        className="w-full outline-none border-2 font-bold max-h-[200px] min-h-[75px] border-gray-800 p-2 pt-4 rounded-lg"
      />
    </div>
  );
};

export default TextArea;
