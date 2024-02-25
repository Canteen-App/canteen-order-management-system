"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import items from "../../../data/item-data.json";

const dailyMenus = ["Breakfast", "Lunch", "Dinner"];

const MenuPage = () => {
  const [selectedDailyMenu, setSelectedDailyMenu] = useState(dailyMenus[0]);

  return (
    <div>
      <div className="text-5xl font-black text-primary ml-10 mt-10">Menu</div>
      <div className="px-20 pt-5 w-full">
        <div className="text-3xl font-black text-primary">Daily Meals</div>
        <div className="mt-4 w-full">
          <div className="flex w-fit rounded-lg overflow-hidden border-b-0 rounded-b-none">
            {dailyMenus.map((dailyMenu) => (
              <div
                onClick={() => setSelectedDailyMenu(dailyMenu)}
                className={`${
                  dailyMenu == selectedDailyMenu
                    ? "bg-primary text-white"
                    : "text-primary bg-secondary"
                } font-black duration-300 hover:bg-primary hover:text-white cursor-pointer text-lg px-10 py-2`}
              >
                {dailyMenu}
              </div>
            ))}
          </div>
          <div className="border-2 border-primary p-2 rounded-lg rounded-tl-none">
            <div className="flex items-center gap-4 w-full">
              <div className="grow font-black text-xl">12pm - 4pm</div>
              <button className="flex gap-2 px-3 py-1 text-xl items-center justify-center w-fit bg-secondary font-black rounded">
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
    </div>
  );
};

const ItemCard = ({
  name,
  price,
  imageURL,
}: {
  name: string;
  price: number;
  imageURL: string;
}) => {
  return (
    <div className="relative cursor-pointer w-full h-fit rounded-xl overflow-hidden">
      <div className="h-full absolute top-0 w-full bg-primary opacity-50" />
      <div className="absolute top-0 p-2">
        <div className="text-white font-black text-2xl">{name}</div>
        <div className="text-white font-black text-lg">Rs {price}</div>
      </div>
      <Image
        className="m-auto"
        width={150}
        height={120}
        src={imageURL}
        alt={""}
      />
    </div>
  );
};

export default MenuPage;
