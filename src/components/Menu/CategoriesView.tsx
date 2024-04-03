import React, { useEffect, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import CreateCategory from "./CreateCategory";
import EditCategory from "./EditCategory";
import ItemCard from "./ItemCardView";
import ItemDetailsView from "./ItemDetailsView";

import { Category, CategoryType, DisplayCategoryType, Item } from "../../types";
import { getCategories } from "../../services/categories";
import CreateItem from "./CreateItem";
import { getItemsByCategory } from "@/src/services/items";
import EditItem from "./EditItem";

const CategoriesView = ({ target }: { target: CategoryType }) => {
  // Category Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  // Selected Category State
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    categories[0]
  );
  const [selectedItem, setSelectedItem] = useState<Item | null>(items[0]);

  // Open Modal States
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openCreateItemForm, setOpenCreateItemForm] = useState(false);
  const [openEditItemForm, setOpenEditItemForm] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items]);

  // Get Categories
  useEffect(() => {
    const getData = async () => {
      const fetched_categories = await getCategories(target);
      setCategories(fetched_categories);
      setSelectedCategory(fetched_categories[0]);
    };

    getData();
  }, [target]);

  // Get Selected Category Items
  useEffect(() => {
    const getData = async () => {
      if (selectedCategory?.id) {
        const fetched_items = await getItemsByCategory(selectedCategory.id);
        setItems(fetched_items);
      }
    };

    getData();
  }, [selectedCategory]);

  return (
    <>
      <div className="px-20 pt-5 w-full">
        <div className="text-3xl font-black text-primary">
          {DisplayCategoryType(target)}
        </div>
        <div className="mt-4 w-full">
          <div className="flex justify-between">
            <div className="flex w-fit rounded-lg overflow-hidden border-b-0 rounded-b-none">
              {categories.map((category) => (
                <div
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory && category.name == selectedCategory.name
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
              className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary text-primary hover:bg-primary hover:text-white rounded-t-lg font-black"
            >
              <FaPlus className="text-2xl" />
              Add {DisplayCategoryType(target)}
            </button>
          </div>
          <div className="border-2 pl-5 border-primary p-2 rounded-b-lg ">
            <div className="flex items-center gap-4 w-full justify-end">
              {target == CategoryType.DAILY_MEAL && (
                <div className="flex-grow font-bold text-2xl">
                  {selectedCategory?.startTime} - {selectedCategory?.endTime}
                </div>
              )}
              <button
                onClick={() => setOpenEditForm(true)}
                className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary text-primary hover:bg-primary hover:text-white font-black rounded-lg"
              >
                <FaEdit className="text-2xl" />
                Edit
              </button>
              <button
                onClick={() => setOpenCreateItemForm(true)}
                className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary text-primary hover:bg-primary hover:text-white font-black rounded-lg"
              >
                <FaPlus className="text-2xl" />
                Add Meal
              </button>
            </div>
            <div className="overflow-auto pr-5 h-[350px] mt-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {items.map((item) => (
                  <ItemCard
                    onClick={() => setSelectedItem(item)}
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
        <CreateCategory
          closeFunc={setOpenCreateForm}
          setSelectedCategory={setSelectedCategory}
          setCategories={setCategories}
          target={target}
        />
      )}

      {selectedCategory && openEditForm && (
        <EditCategory
          category={selectedCategory}
          closeFunc={setOpenEditForm}
          target={target}
          setCategories={setCategories}
          setSelectedCategory={setSelectedCategory}
        />
      )}

      {selectedCategory && openCreateItemForm && (
        <CreateItem
          target={target}
          setItems={setItems}
          category={selectedCategory}
          closeFunc={setOpenCreateItemForm}
        />
      )}

      {selectedItem && (
        <ItemDetailsView
          setOpenEditItemForm={setOpenEditItemForm}
          closeFunc={() => setSelectedItem(null)}
          item={selectedItem}
        />
      )}

      {selectedItem && openEditItemForm && (
        <EditItem
          target={target}
          closeFunc={setOpenEditItemForm}
          item={selectedItem}
          setItems={setItems}
        />
      )}
    </>
  );
};

export default CategoriesView;
