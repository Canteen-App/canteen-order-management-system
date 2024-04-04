import React, { Dispatch, SetStateAction, useState } from "react";
import { Category, CategoryType } from "../../types";
import Modal from "../Modal";
import TextInput from "../input/TextInput";
import TextArea from "../input/TextArea";
import { createItem, setItemImage } from "../../services/items/index";
import ImageUpload from "../input/ImageUpload";
import { uploadFile } from "../../utils/fileUpload";

interface CreateItemPropsType {
  category: Category;
  target: CategoryType;
  closeFunc: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<any>>;
}

const CreateItem = ({
  setItems,
  category,
  closeFunc,
  target,
}: CreateItemPropsType) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(NaN);
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (category.id && name && description && price > 0 && file) {
      const body = {
        name,
        price,
        description,
        categoryId: category.id,
      };

      console.log(body);

      const newItem = await createItem(body);
      console.log(newItem);

      if (newItem.id && file && target) {
        const imageURL = await uploadFile(file, newItem.id, target);
        if (imageURL) {
          const updatedItem = await setItemImage(newItem.id, imageURL);
          console.log(updatedItem);
          setItems((prevItems: any) => [updatedItem, ...prevItems]);
          closeFunc(false);
          return;
        }
      } else {
        setItems((prevItems: any) => [newItem, ...prevItems]);
        closeFunc(false);
      }
    }
  };

  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="w-[600px] max-h-[90vh] z-50 overflow-y-auto">
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-black w-fit bg-primary text-white rounded-lg p-2">
            {category.name}
          </div>
          <div className="text-3xl font-black">Create New Item</div>
        </div>

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
            Create Item
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateItem;
