"use client";
import React, { useEffect, useState } from "react";
import { CategoryType, Order } from "../../../../src/types";
import {
  getOrderDetails,
  getTodaysOrders,
} from "../../../../src/services/orders";
import OrderCategoryView from "../../../components/Order/OrderCategoryView";
import ViewOrderDetails from "../../../components/Order/ViewOrderDetails";
import { useNewOrderNotification } from "../../../../context/newOrderEvent";
import { useItemsCollectedNotification } from "../../../../context/itemsCollectedEvent";

const OrderPage = () => {
  const [todaysOrders, setTodaysOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { newOrderNotification } = useNewOrderNotification();
  const { itemsCollectedNotification } = useItemsCollectedNotification();

  useEffect(() => {
    const getData = async () => {
      const fetchedTodaysOrder = await getTodaysOrders();
      setTodaysOrders(fetchedTodaysOrder);
    };

    getData();
  }, []);

  useEffect(() => {
    const getNewOrderData = async () => {
      console.log("Gettting New Order");
      if (newOrderNotification && newOrderNotification.orderId) {
        const fetchedNewOrder = await getOrderDetails(
          newOrderNotification?.orderId
        );
        if (fetchedNewOrder) {
          setTodaysOrders([fetchedNewOrder, ...todaysOrders]);
        }
      }
    };
    getNewOrderData();
  }, [newOrderNotification]);

  useEffect(() => {
    const getNewOrderData = async () => {
      console.log("Updating New Order");
      if (itemsCollectedNotification && itemsCollectedNotification.orderId) {
        const fetchedUpdatedOrder = await getOrderDetails(
          itemsCollectedNotification.orderId
        );

        console.log(fetchedUpdatedOrder);

        if (fetchedUpdatedOrder) {
          setTodaysOrders((prevOrders) =>
            prevOrders.map((order) =>
              order.id === fetchedUpdatedOrder.id ? fetchedUpdatedOrder : order
            )
          );
          setSelectedOrder(fetchedUpdatedOrder);
        }
      }
    };

    getNewOrderData();
  }, [itemsCollectedNotification]);

  return (
    <>
      <div className="p-5 flex gap-4 flex-wrap h-screen">
        <div className="w-full">
          <div className="text-2xl font-bold">
            Todays Orders | {new Date().toDateString()}
          </div>
        </div>
        <div className="p-4 h-[95%] overflow-y-auto border-2 rounded-xl">
          <OrderCategoryView categoryType={CategoryType.DAILY_MEAL} />
          <OrderCategoryView categoryType={CategoryType.NORMAL_CATEGORY} />
        </div>
        <div className="flex-grow overflow-hidden rounded-xl border-2 h-fit">
          <table className="w-full">
            {todaysOrders &&
              todaysOrders.map((todaysOrder, index) => (
                <tr key={index} className="border-2 mb-4 w-full h-fit">
                  <td className="font-bold p-2">{todaysOrder.id}</td>
                  <td className=""> {todaysOrder.customer.name}</td>
                  <td>Rs {todaysOrder.payment.totalAmount.toLocaleString()}</td>
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
