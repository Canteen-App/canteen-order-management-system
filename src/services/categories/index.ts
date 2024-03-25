import fetchAPI from "../../../axios";
import { CategoryType } from "../../types";

export const getCategories = async (target: CategoryType) => {
  const response = await fetchAPI(`/category/${target}`);
  return response.data
};
