"use client";
import React from "react";
import CategoriesView from "../../../components/Menu/CategoriesView";
import { CategoryType } from "../../../types";

const MenuPage = () => {
  return (
    <div>
      <div className="text-5xl font-black text-primary ml-10 mt-10">Menu</div>
      <CategoriesView target={CategoryType.DAILY_MEAL} />
      <CategoriesView target={CategoryType.NORMAL_CATEGORY} />
    </div>
  );
};

export default MenuPage;
