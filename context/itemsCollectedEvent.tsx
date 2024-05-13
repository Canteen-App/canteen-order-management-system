import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ItemsCollectedNotificationContextType {
  itemsCollectedNotification: { orderId: string } | null;
  clearNotification: () => void;
}

const ItemsCollectedNotificationContext =
  createContext<ItemsCollectedNotificationContextType>({
    itemsCollectedNotification: null,
    clearNotification: () => {},
  });

export const useItemsCollectedNotification =
  (): ItemsCollectedNotificationContextType =>
    useContext(ItemsCollectedNotificationContext);

export const ItemsCollectedNotificationProvider = ({ children }: any) => {
  const [itemsCollectedNotification, setItemsCollectedNotification] = useState<{
    orderId: string;
  } | null>(null);

  useEffect(() => {
    const source = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/events/check-items-collected`
    );

    console.log(source);

    source.onmessage = (event) => {
      const data: { orderId: string } = JSON.parse(event.data);
      console.log("Items Collected:", data);
      toast.success(
        `Items Collected from Order Id: ${data.orderId.split("-")[0]}`
      ); // Send Toast Notification
      setItemsCollectedNotification(data); // Update notification state when new order is received
    };

    source.onerror = (error) => {
      console.error("Error with SSE:", error);
      // Handle error, e.g., reconnect or display error message
    };

    return () => {
      source.close();
    };
  }, []);

  const clearNotification = () => {
    setItemsCollectedNotification(null);
  };

  const contextValue: ItemsCollectedNotificationContextType = {
    itemsCollectedNotification,
    clearNotification,
  };

  return (
    <ItemsCollectedNotificationContext.Provider value={contextValue}>
      {children}
    </ItemsCollectedNotificationContext.Provider>
  );
};
