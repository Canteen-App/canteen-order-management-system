import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CategoryType, Item } from "../../types";
import Modal from "../Modal";
import TextInput from "../input/TextInput";
import TextArea from "../input/TextArea";
import { editItem, setItemImage } from "../../services/items/index";
import ImageUpload from "../input/ImageUpload";
import { uploadFile } from "../../utils/fileUpload";

interface EditItemPropsType {
  item: Item;
  setItem: Dispatch<SetStateAction<Item | null>>;
  closeFunc: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<Item[]>>;
  target: CategoryType;
}

const EditItem = ({
  setItems,
  item,
  setItem,
  closeFunc,
  target,
}: EditItemPropsType) => {
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(item.price);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState(item.description ?? "");

  useEffect(() => {
    const setData = () => {
      setName(item.name);
      setPrice(item.price);
      setDescription(item.description ?? "");
    };

    setData();
  }, [item]);

  const handleSubmit = async () => {
    if (
      name != item.name ||
      description != item.description ||
      (price > 0 && price != item.price)
    ) {
      const body = {
        name,
        price,
        description,
      };

      const newItem = await editItem(item.id, body);

      setItem(newItem);

      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id == newItem.id ? newItem : prevItem
        )
      );
      closeFunc(false);
    }

    if (item.id && file && target) {
      const imageURL = await uploadFile(file, item.id, target);
      if (imageURL) {
        const updatedItem = await setItemImage(item.id, imageURL);
        setItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id == updatedItem.id ? updatedItem : prevItem
          )
        );
        closeFunc(false);
      }
    }
  };

  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="w-[600px]">
        <div className="text-3xl font-black">Edit New Item</div>

        <div className="mt-5 text-right">
          <TextInput
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <TextArea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <ImageUpload file={file} setFile={setFile} />
          <button
            onClick={handleSubmit}
            className="font-black mt-5 p-2 rounded-lg text-xl bg-primary text-white"
          >
            Edit Item
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditItem;
