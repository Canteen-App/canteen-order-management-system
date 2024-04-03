import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";

interface ImageUploadPropsType {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
}

const ImageUpload = ({ file, setFile }: ImageUploadPropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      {!file ? (
        <>
          <label
            htmlFor="fileInput"
            className="w-full hover:bg-primary hover:text-secondary hover:text-3xl ease-in-out duration-75 font-black text-2xl cursor-pointer flex items-center justify-center min-h-[200px] bg-secondary rounded-xl"
          >
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            onChange={(e) => e.target.files && setFile(e.target.files[0])}
            type="file"
            id="fileInput"
            className="hidden"
          />
        </>
      ) : (
        <div className="overflow-hidden rounded-xl relative">
          <button
            className="bg-white text-red-800 hover:bg-red-800 hover:text-white text-2xl p-1 rounded-full absolute top-1 right-1"
            type="button"
            onClick={clearFile}
          >
            <FaXmark />
          </button>
          <img className="w-full" src={URL.createObjectURL(file)} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
