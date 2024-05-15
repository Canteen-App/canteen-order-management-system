import { Order } from "../../types";
import fetchAPI from "../../../axios";

export const getOrderByDate = async (date?: string): Promise<Order[]> => {
  const response = await fetchAPI.get(`/order/orders?date=${date}`);
  return response.data;
};

export const getOrderDetails = async (orderId: string): Promise<Order> => {
  const response = await fetchAPI.get(`/order/get-order/${orderId}`);
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
  return response.data;
};
