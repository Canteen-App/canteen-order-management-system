import { Order } from "../../types";
import fetchAPI from "../../../axios";

export const getOrders = async (): Promise<Order[]> => {
  const response = await fetchAPI.get(`/order/paid`);
  return response.data;
};

export const getTodaysOrders = async (): Promise<Order[]> => {
  const response = await fetchAPI.get(`/order/todays`);
  return response.data;
};

export const getOrderDetails = async (orderId: string): Promise<Order> => {
  const response = await fetchAPI.get(`/order/todays/${orderId}`);
  console.log(response);
  return response.data;
};

export const orderCollection = async (
  orderId: string,
  code: string,
  collectItemCountList: any[]
) => {
  const body = {
    code,
    collectItemCountList,
  };

  const response = await fetchAPI.post(`/order/collection/${orderId}`, body);
  console.log(response);
  return response.data;
};
