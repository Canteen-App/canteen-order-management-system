import React, { createContext, useContext, useEffect, useState } from "react";

interface NewOrderNotificationContextType {
  newOrderNotification: { orderId: string } | null;
  clearNotification: () => void;
}

const NewOrderNotificationContext =
  createContext<NewOrderNotificationContextType>({
    newOrderNotification: null,
    clearNotification: () => {},
  });

export const useNewOrderNotification = (): NewOrderNotificationContextType =>
  useContext(NewOrderNotificationContext);

export const NewOrderNotificationProvider = ({ children }: any) => {
  const [newOrderNotification, setNewOrderNotification] = useState<{
    orderId: string;
  } | null>(null);

  useEffect(() => {
    const source = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/events/check-new-orders`
    );

    console.log(source)

    source.onmessage = (event) => {
      const data: { orderId: string } = JSON.parse(event.data);
      console.log("New order received:", data);
      setNewOrderNotification(data); // Update notification state when new order is received
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
    setNewOrderNotification(null);
  };

  const contextValue: NewOrderNotificationContextType = {
    newOrderNotification,
    clearNotification,
  };

  return (
    <NewOrderNotificationContext.Provider value={contextValue}>
      {children}
    </NewOrderNotificationContext.Provider>
  );
};
