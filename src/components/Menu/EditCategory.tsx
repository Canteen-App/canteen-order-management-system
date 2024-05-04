import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal";
import TextInput from "../input/TextInput";
import StartEndTimeSelector from "../input/TimeSelector";
import { Category, CategoryType, DisplayCategoryType } from "../../types";

interface EditCategoryTypes {
  closeFunc: Dispatch<SetStateAction<boolean>>;
  target: CategoryType;
  category: Category;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setSelectedCategory: Dispatch<SetStateAction<Category>>;
}

const EditCategory = ({
  closeFunc,
  target,
  category,
  setCategories,
  setSelectedCategory,
}: EditCategoryTypes) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    const setInitialData = () => {
      setName(category.name);
    };

    setInitialData();
  }, [category]);

  const handleSubmit = async () => {
    const body = {
      name: name,
      startTime: startTime,
      endTime: endTime,
    };

    if (
      category.name != name ||
      category.startTime != startTime ||
      category.endTime != endTime
    ) {
      setCategories((prevCategories: Category[]) =>
        prevCategories.map((prevCategory) =>
          prevCategory.id == category.id ? body : prevCategory
        )
      );
      setSelectedCategory({ ...body, id: category.id });
    } else {
      console.log("Nothing changed");
    }
  };

  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="w-[500px] text-right">
        <div className="flex gap-2 items-center">
          <div className="text-2xl font-black w-fit bg-primary text-white rounded-lg p-2">
            {category.name}
          </div>
          <div className="font-black text-left text-2xl select-none">
            Edit {DisplayCategoryType(target)}
          </div>
        </div>

        <div className="mt-4">
          <div>
            <TextInput
              label="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {target == CategoryType.DAILY_MEAL && (
              <StartEndTimeSelector
                initialCategory={category}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
              />
            )}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="font-black mt-5 p-2 rounded-lg text-xl bg-primary text-white"
        >
          Edit Category
        </button>
      </div>
    </Modal>
  );
};

export default EditCategory;
