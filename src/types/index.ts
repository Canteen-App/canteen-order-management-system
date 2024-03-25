export interface Category {
  name: string;
  startTime?: string;
  endTime?: string;
}

export interface Item {
  id: string;
  category: {
    name: string;
    startTime?: string;
    endTime?: string;
  };
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export enum CategoryType {
  NORMAL_CATEGORY = "NORMAL_CATEGORY",
  DAILY_MEAL = "DAILY_MEAL"
}

export const DisplayCategoryType = (target: CategoryType) => {
  if (target == CategoryType.DAILY_MEAL) {
    return "Daily Meals"
  }
  if (target == CategoryType.NORMAL_CATEGORY) {
    return "Categories"
  }

  return ""
}