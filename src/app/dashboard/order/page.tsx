"use client";
import React, { useEffect, useState } from "react";
import { getOrders, getTodaysOrders } from "../../../services/orders";
import { CategoryType, Order } from "@/src/types";
import { getCategories } from "@/src/services/categories";
import { getItemOrderDetails } from "@/src/services/items";

const OrderPage = () => {
  return (
    <div className="p-10">
      <div className="text-5xl font-black text-primary">Orders</div>
      <div>
        <div className="text-3xl font-bold text-primary">
          Total Items Ordered
        </div>
        <div className="flex w-full flex-wrap items-stetch">
          <OrderCategoryView categoryType={CategoryType.DAILY_MEAL} />
          <OrderCategoryView categoryType={CategoryType.NORMAL_CATEGORY} />
        </div>
      </div>
    </div>
  );
};

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
    <div className="w-1/2 h-full">
      <div className="text-2xl font-black text-primary">
        {categoryType === CategoryType.DAILY_MEAL
          ? "Daily Meal Orders"
          : "Normal Item Orders"}
      </div>
      <div className="flex flex-wrap h-full items-stretch">
        {categories.map((category: any, index: number) => (
          <div key={index} className="w-1/2 p-2">
            <div className="border-2 rounded-xl h-full p-2">
              <div className="text-2xl font-bold text-primary">
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

const ItemOrderView = ({ itemId }: { itemId: string }) => {
  const [itemOrder, setItemOrder] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedItemDetails = await getItemOrderDetails(itemId);
      setItemOrder(fetchedItemDetails);
    };
    getData();
  }, [itemId]);

  if (!itemOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center cursor-default px-2 overflow-hidden h-fit hover:bg-[#ffb80688] select-none rounded-lg border-b-2">
      <div className="relative w-full h-fit overflow-hidden">
        <div className="text-primary text-xl">{itemOrder.name}</div>
      </div>
      <div className="font-black text-2xl h-fit text-primary">
        {itemOrder._count.orderItems}
      </div>
    </div>
  );
};

export default OrderPage;
