import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal";
import TextInput from "../input/TextInput";
import StartEndTimeSelector from "../input/TimeSelector";
import { Category, CategoryType, DisplayCategoryType } from "../../types";
import { validateStartEndTimes } from "@/src/utils/timeValidation";
import toast from "react-hot-toast";
import { createCategory } from "@/src/services/categories";

interface CreateCategoryTypes {
  closeFunc: Dispatch<SetStateAction<boolean>>;
  target: CategoryType;
  setCategories: Dispatch<SetStateAction<Category[]>>;
  setSelectedCategory: Dispatch<SetStateAction<Category>>;
}

const CreateCategory = ({
  closeFunc,
  target,
  setCategories,
  setSelectedCategory,
}: CreateCategoryTypes) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleSubmit = async () => {
    if (!name) {
      toast.error("Name is not entered");
      return false;
    }

    if (target == CategoryType.NORMAL_CATEGORY) {
      const body = {
        name: name,
      };

      const newCategory = await createCategory(body, target);

      console.log(newCategory);

      setCategories((prevCategories: Category[]) => {
        console.log([...prevCategories, newCategory]);
        return [...prevCategories, newCategory];
      });
      setSelectedCategory(newCategory);

      toast.success("Successfully created!");

      closeFunc(false);

      return;
    }

    if (validateStartEndTimes(startTime, endTime)) {
      const body = {
        name: name,
        startTime: startTime,
        endTime: endTime,
      };

      const newCategory = await createCategory(body, target);

      console.log(newCategory);

      setCategories((prevCategories: Category[]) => {
        console.log([...prevCategories, body]);
        return [...prevCategories, body];
      });
      setSelectedCategory(body);

      toast.success("Successfully created!");

      closeFunc(false);
    } else {
      toast.error("End Time is less than Start Time");
    }
  };

  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="w-[500px] text-right">
        <div className="font-black text-left text-2xl select-none">
          Create {DisplayCategoryType(target)}
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
          Create Category
        </button>
      </div>
    </Modal>
  );
};

export default CreateCategory;
