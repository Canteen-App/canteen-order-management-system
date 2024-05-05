import React, { useEffect, useState } from "react";
import { CategoryType } from "../../types";
import { getCategories } from "../../services/categories";
import ItemOrderView from "./ItemOrderView";

const OrderCategoryView = ({
  categoryType,
}: {
  categoryType: CategoryType;
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedCategories = await getCategories(categoryType);
      setCategories(fetchedCategories);
    };
    getData();
  }, [categoryType]);

  return (
    <div className="h-fit">
      <div className="text-2xl text-center font-black text-primary">
        {categoryType === CategoryType.DAILY_MEAL
          ? "Daily Meal Orders"
          : "Normal Item Orders"}
      </div>
      <div className="h-full items-stretch">
        {categories.map((category: any, index: number) => (
          <div key={index} className="py-2">
            <div className="border-2 rounded-xl h-full p-2">
              <div className="text-xl font-bold text-primary">
                {category.name}
              </div>
              <div className="">
                {category.items.map((item: any) => (
                  <ItemOrderView key={item.id} itemId={item.id} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCategoryView;
