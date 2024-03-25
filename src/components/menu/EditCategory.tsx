import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal";
import Input from "../Input";
import StartEndTimeSelector from "../TimeSelector";
import { CategoryType, DisplayCategoryType } from "../../types";

interface EditCategoryTypes {
  closeFunc: Dispatch<SetStateAction<boolean>>;
  target: CategoryType;
  category: {
    name: string;
    startTime?: string;
    endTime?: string;
  };
}

const EditCategory = ({ closeFunc, target, category }: EditCategoryTypes) => {
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

    if (category.name != name || category.startTime != startTime || category.endTime != endTime) {
      console.log(body);
    } else {
      console.log("Nothing changed")
    }
  };

  return (
    <Modal closeFunc={() => closeFunc(false)}>
      <div className="w-[500px] text-right">
        <div className="font-black text-left text-2xl select-none">
          Edit {DisplayCategoryType(target)}
        </div>
        <div className="mt-4">
          <div>
            <Input
              label="Name"
              onChange={(e: { target: { value: string } }) =>
                setName(e.target.value)
              }
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
