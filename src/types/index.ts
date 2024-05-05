export interface Category {
  id?: string;
  name: string;
  startTime?: string;
  endTime?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Item {
  id: string;
  category?: {
    name: string;
    startTime?: string;
    endTime?: string;
  };
  categoryId?: string;
  name: string;
  price: number;
  description?: string;
  imageURL?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Order {
  id: string;
  customer: {
    id: string;
    name: string;
  };
  items: OrderItem[];
  orderTime: string;
  payment: Payment;
}

export interface OrderItem {
  id: string;
  item: Item;
  orderId: string;
  itemId: string;
  quantityCollected: number;
  quantity: number;
  billedItemName?: string;
  billedPricePerQuantity: string;
}

interface Payment {
  id: string;
  order?: Order;
  orderId: string;
  totalAmount: number;
  paymentTime: Date;
  status: PaymentStatus;
}
enum PaymentStatus {
  CANCELED = "CANCELED",
  PENDING = "PENDING",
  COMPLETE = "COMPLETE",
}

export enum CategoryType {
  NORMAL_CATEGORY = "NORMAL_CATEGORY",
  DAILY_MEAL = "DAILY_MEAL",
}

export const DisplayCategoryType = (target: CategoryType) => {
  if (target == CategoryType.DAILY_MEAL) {
    return "Daily Meals";
  }
  if (target == CategoryType.NORMAL_CATEGORY) {
    return "Categories";
  }

  return "";
};
