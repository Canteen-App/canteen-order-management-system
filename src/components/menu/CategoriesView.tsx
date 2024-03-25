import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import ItemCard from "../ItemCardView";

import items from "../../../data/item-data.json"; // Test Data
import { Category, CategoryType, DisplayCategoryType } from "../../types";
import { getCategories } from "../../services/categories";

const CategoriesView = ({ target }: { target: CategoryType }) => {
  // Category Data State
  const [categories, setCategories] = useState<Category[]>([]);

  // Selected Category State
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Open Modal States
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openEditForm, setEditForm] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const fetched_categories = await getCategories(target)
      setCategories(fetched_categories)
      setSelectedCategory(fetched_categories[0])
    };

    getData();
  }, [target]);

  return (
    <>
      <div className="px-20 pt-5 w-full">
        <div className="text-3xl font-black text-primary">{DisplayCategoryType(target)}</div>
        <div className="mt-4 w-full">
          <div className="flex justify-between">
            <div className="flex w-fit rounded-lg overflow-hidden border-b-0 rounded-b-none">
              {categories.map((category) => (
                <div
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    category.name == selectedCategory.name
                      ? "bg-primary text-white"
                      : "text-primary bg-secondary"
                  } font-black duration-300 hover:bg-primary ease-in-out hover:text-white cursor-pointer text-lg px-10 py-2`}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <button
              onClick={() => setOpenCreateForm(true)}
              className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary font-black rounded"
            >
              <FaPlus className="text-2xl" />
              Add {DisplayCategoryType(target)}
            </button>
          </div>
          <div className="border-2 border-primary p-2 rounded-lg rounded-tl-none">
            <div className="flex items-center gap-4 w-full justify-end">
              {target == CategoryType.DAILY_MEAL && (
                <div className="flex-grow">
                  {selectedCategory?.startTime} - {selectedCategory?.endTime}
                </div>
              )}
              <button
                onClick={() => setEditForm(true)}
                className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary font-black rounded"
              >
                <FaEdit className="text-2xl" />
                Edit
              </button>
              <button className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary font-black rounded">
                <FaPlus className="text-2xl" />
                Add Meal
              </button>
            </div>
            <div className="overflow-auto h-[350px] mt-5">
              <div className="grid grid-cols-5 gap-5">
                {items.map((item) => (
                  <ItemCard
                    name={item.name}
                    price={item.price}
                    imageURL={item.imageURL}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openCreateForm && (
        <CreateCategory closeFunc={setOpenCreateForm} setSelectedCategory={setSelectedCategory} setCategories={setCategories} target={target} />
      )}

      {openEditForm && (
        <EditCategory
          category={selectedCategory}
          closeFunc={setEditForm}
          target={target}
        />
      )}
    </>
  );
};

export default CategoriesView;
