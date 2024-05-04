import React, { ReactElement } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalTypes {
  closeFunc: () => void;
  children: ReactElement;
}

const Modal = ({ closeFunc, children }: ModalTypes) => {
  return (
    <div className="w-full flex justify-center z-50 items-center h-screen top-0 fixed bg-[#00000060]">
      <div className="w-fit bg-white rounded-lg relative h-fit p-4">
        <button
          onClick={closeFunc}
          className="flex z-50 justify-center items-center bg-red-700 rounded-full p-2 text-white text-xl absolute top-2 right-2"
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
