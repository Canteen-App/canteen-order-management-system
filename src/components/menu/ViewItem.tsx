import React, { Dispatch, SetStateAction } from "react";
import Modal from "../Modal";
import { Item } from "../../types";

interface ViewItemTypes {
  closeFunc: Dispatch<SetStateAction<boolean>>;
  item: Item
}

const ViewItem = ({ closeFunc, item }: ViewItemTypes) => {
  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="w-[500px] text-right">
        <div>{item.name}</div>
      </div>
    </Modal>
  );
};

export default ViewItem;
