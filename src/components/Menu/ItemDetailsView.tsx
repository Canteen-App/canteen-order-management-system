import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal";
import { Item } from "@/src/types";
import { FaEdit } from "react-icons/fa";

import EditItem from "../Menu/EditItem";

interface ItemDetailsViewPropsType {
  closeFunc: Dispatch<SetStateAction<boolean>>;
  setOpenEditItemForm: Dispatch<SetStateAction<boolean>>;
  item: Item;
}

const ItemDetailsView = ({
  closeFunc,
  item,
  setOpenEditItemForm,
}: ItemDetailsViewPropsType) => {
  const [imageURL, setImageURL] = useState(item.imageURL);

  useEffect(() => {
    const getImageURL = () => {
      setImageURL(item.imageURL);
    };

    getImageURL();
  }, [item]);

  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="relative h-[75vh] overflow-hidden">
        <div className="text-3xl font-black ">{item.name}</div>
        <div className="rounded-lg overflow-hidden">
          {imageURL ? (
            <img
              className="h-[400px] w-full object-cover"
              src={imageURL}
              onError={() => setImageURL("/no-image-error.png")}
            />
          ) : (
            <img className="w-full" src={"/no-image-error.png"} />
          )}
        </div>
        <div className="text-xl font-bold">Rs {item.price}</div>
        <div className="text-lg">{item.description}</div>
        <div className="absolute border-t-2 pt-4 bg-white flex items-center font-bold bottom-0 left-0 w-full">
          <div className="flex-grow" />
          <button
            onClick={() => setOpenEditItemForm(true)}
            className="text-xl flex gap-2 text-primary bg-secondary font-bold hover:bg-primary p-2 rounded hover:text-white"
          >
            <span>Edit Item Details</span>
            <FaEdit className="text-2xl" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemDetailsView;
