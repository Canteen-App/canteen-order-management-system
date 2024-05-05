"use client";
import React, { useEffect, useState } from "react";
import { CategoryType, Order } from "@/src/types";
import { getTodaysOrders } from "@/src/services/orders";
import OrderCategoryView from "../../../components/Order/OrderCategoryView";
import ViewOrderDetails from "../../../components/Order/ViewOrderDetails";

const OrderPage = () => {
  const [todaysOrders, setTodaysOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getData = async () => {
      const fetchedTodaysOrder = await getTodaysOrders();
      setTodaysOrders(fetchedTodaysOrder);
    };

    getData();
  }, []);

  return (
    <>
      <div className="p-5 flex gap-4 h-screen">
        <div className="p-4 h-full overflow-y-auto border-2 rounded-xl">
          <OrderCategoryView categoryType={CategoryType.DAILY_MEAL} />
          <OrderCategoryView categoryType={CategoryType.NORMAL_CATEGORY} />
        </div>
        <div className="flex-grow overflow-hidden rounded-xl border-2 h-fit">
          <table className="w-full">
            {todaysOrders &&
              todaysOrders.map((todaysOrder) => (
                <tr className="border-2 mb-4 w-full h-fit">
                  <td className="font-bold p-2">{todaysOrder.id}</td>
                  <td className=""> {todaysOrder.customer.name}</td>
                  <td>Rs {todaysOrder.payment.totalAmount}</td>
                  <td>
                    {new Date(todaysOrder.orderTime).toLocaleTimeString()}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => setSelectedOrder(todaysOrder)}
                      className="w-full p-2 font-black text-white rounded-xl bg-primary text-center "
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
      {selectedOrder && (
        <ViewOrderDetails
          orderDetails={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}
    </>
  );
};

export default OrderPage;
