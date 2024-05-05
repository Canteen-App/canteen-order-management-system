import { Order } from "../../types";
import fetchAPI from "../../../axios";

export const getOrders = async (): Promise<Order[]> => {
  const reponse = await fetchAPI.get(`/order/paid`);
  return reponse.data;
};

export const getTodaysOrders = async (): Promise<Order[]> => {
  const reponse = await fetchAPI.get(`/order/todays`);
  return reponse.data;
};
