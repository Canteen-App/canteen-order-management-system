import React, { useEffect, useState } from "react";
import { getItemOrderDetails } from "../../services/items";
import { useNewOrderNotification } from "../../../context/newOrderEvent";

const ItemOrderView = ({ itemId }: { itemId: string }) => {
  const [itemOrder, setItemOrder] = useState<any>(null);

  const { newOrderNotification } = useNewOrderNotification();

  useEffect(() => {
    const getData = async () => {
      const fetchedItemDetails = await getItemOrderDetails(itemId);
      setItemOrder(fetchedItemDetails);
    };
    getData();
  }, [itemId, newOrderNotification]);

  if (!itemOrder) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center group cursor-default px-2 overflow-hidden h-fit hover:bg-[#ffb80688] select-none rounded-lg border-b-2">
      <div className="relative w-full h-fit overflow-hidden">
        <div className="text-primary truncate group-hover:font-bold text-lg">
          {itemOrder.name}
        </div>
      </div>
      <div className="font-black px-2 text-xl h-fit text-primary">
        {itemOrder.totalQuantity}
      </div>
    </div>
  );
};

export default ItemOrderView;
