import fetchAPI from "../../../axios";
import { Category, CategoryType } from "../../types";

export const getCategories = async (target: CategoryType) => {
  const response = await fetchAPI.get(`/category/${target}`);
  return response.data;
};

export const createCategory = async (body: Category, target: CategoryType) => {
  const response = await fetchAPI.post(`/category/${target}`, body);
  return response.data;
};
