import { Category, Item } from "@/src/types";
import fetchAPI from "../../../axios";

interface CreateItemType {
  name: string;
  price: number;
  description: string;
  categoryId: string;
}

interface EditItemType {
  name?: string;
  price?: number;
  description?: string;
}

export const getItemsByCategory = async (
  categoryId: string
): Promise<Item[]> => {
  const reponse = await fetchAPI.get(`/item/category/${categoryId}`);
  return reponse.data;
};

export const createItem = async (body: CreateItemType): Promise<Item> => {
  const response = await fetchAPI.post("/item", body);
  return response.data;
};

export const editItem = async (
  itemId: string,
  body: EditItemType
): Promise<Item> => {
  const response = await fetchAPI.put(`/item/${itemId}`, body);
  return response.data;
};

export const setItemImage = async (
  itemId: string,
  imageURL: string
): Promise<Item> => {
  const response = await fetchAPI.put(`/item/${itemId}/set-image`, {
    imageURL,
  });
  return response.data;
};
