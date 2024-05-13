"use client";
import React, { useEffect, useState } from "react";
import { CategoryType, Order } from "../../../../src/types";
import {
  getOrderByDate,
  getOrderDetails,
} from "../../../../src/services/orders";
import OrderCategoryView from "../../../components/Order/OrderCategoryView";
import ViewOrderDetails from "../../../components/Order/ViewOrderDetails";
import { useNewOrderNotification } from "../../../../context/newOrderEvent";
import { useItemsCollectedNotification } from "../../../../context/itemsCollectedEvent";

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { newOrderNotification } = useNewOrderNotification();
  const { itemsCollectedNotification } = useItemsCollectedNotification();
  const [days, setDays] = useState<any>();
  const [selectedDay, setSelectedDay] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      console.log(selectedDay)
      const fetchedOrder = await getOrderByDate(
        selectedDay ? selectedDay.dateStr : undefined
      );
      console.log(fetchedOrder)
      setOrders(fetchedOrder);
    };

    getData();
  }, [selectedDay]);

  useEffect(() => {
    const getNewOrderData = async () => {
      if (newOrderNotification && newOrderNotification.orderId) {
        const fetchedNewOrder = await getOrderDetails(
          newOrderNotification?.orderId
        );
        if (fetchedNewOrder) {
          setOrders([fetchedNewOrder, ...orders]);
        }
      }
    };
    getNewOrderData();
  }, [newOrderNotification]);

  useEffect(() => {
    const getNewOrderData = async () => {
      if (itemsCollectedNotification && itemsCollectedNotification.orderId) {
        const fetchedUpdatedOrder = await getOrderDetails(
          itemsCollectedNotification.orderId
        );
        if (fetchedUpdatedOrder) {
          setOrders((prevOrders) =>
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

  useEffect(() => {
    const getDays = () => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const today = new Date();
      const next7Days = [];

      for (let i = 1; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = date.getDate();

        next7Days.push({
          day: dayOfWeek,
          date: dayOfMonth,
          dateStr: date.toDateString(),
        });
      }

      setDays(next7Days);
    };

    getDays();
  }, []);

  return (
    <>
      <div className="p-5 flex gap-4 flex-wrap h-screen">
        <div className="w-full flex">
          <div
            onClick={() => setSelectedDay(null)}
            className={`text-2xl ${
              selectedDay
                ? "text-primary cursor-pointer"
                : "bg-primary text-white"
            } px-4 py-2 rounded-lg  font-bold`}
          >
            Orders | {new Date().toDateString()}
          </div>
          <div className="flex flex-grow select-none gap-2 px-10 h-full">
            {days &&
              days.map((day: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setSelectedDay(day)}
                  className={`${
                    selectedDay?.date == day?.date
                      ? "bg-primary text-white border-2 border-yellow cursor-default"
                      : "border-2 border-brown-dark cursor-pointer"
                  } rounded-lg px-2 flex-grow flex justify-between items-center h-full`}
                >
                  <div className="font-bold text-xl text-brown-dark text-center">
                    {day.day}
                  </div>
                  <div className="text-2xl text-brown-dark font-black text-center">
                    {day.date}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="p-4 h-[95%] overflow-y-auto border-2 rounded-xl">
          <OrderCategoryView categoryType={CategoryType.DAILY_MEAL} />
          <OrderCategoryView categoryType={CategoryType.NORMAL_CATEGORY} />
        </div>
        <div className="flex-grow overflow-hidden rounded-xl border-2 h-fit">
          <table className="w-full">
            {orders &&
              orders.map((order, index) => (
                <tr key={index} className="border-2 mb-4 w-full h-fit">
                  <td className="font-bold p-2">{order.id}</td>
                  <td className=""> {order.customer.name}</td>
                  <td>Rs {order.payment.totalAmount.toLocaleString()}</td>
                  <td className="p-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
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
