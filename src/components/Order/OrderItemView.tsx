import React, { useEffect, useState } from "react";
import { OrderItem } from "../../types";
import { FaMinus, FaPlus } from "react-icons/fa";

const OrderItemView = ({
  collectItems,
  orderItem,
  selectAllItems,
  setSelectAllItems,
  collectItemCountList,
  setCollectItemCountList,
}: {
  collectItems: boolean;
  selectAllItems: boolean;
  orderItem: OrderItem;
  collectItemCountList: any;
  setSelectAllItems: any;
  setCollectItemCountList: any;
}) => {
  const [collectAmount, setCollectAmount] = useState(0);
  const [canReduceAmount, setCanReduceAmount] = useState(false);

  useEffect(() => {
    setCollectAmount(
      orderItem.quantity - (orderItem.quantity - orderItem.quantityCollected)
    );
    setCanReduceAmount(false);
  }, [orderItem]);

  useEffect(() => {
    if (selectAllItems) {
      setCollectAmount(orderItem.quantity);
    }
  }, [selectAllItems]);

  useEffect(() => {
    if (
      collectAmount <= orderItem.quantity &&
      collectAmount > orderItem.quantityCollected
    ) {
      setCanReduceAmount(true);
    } else {
      setCanReduceAmount(false);
    }
  }, [collectAmount]);

  useEffect(() => {
    if (
      collectAmount <= orderItem.quantity &&
      collectAmount >= orderItem.quantityCollected
    ) {
      if (collectItemCountList && collectItemCountList.length > 0) {
        setCollectItemCountList(
          collectItemCountList.map(
            (item: { itemId: string; collectAmount: number }) => {
              if (item.itemId == orderItem.id) {
                return { itemId: orderItem.id, collectAmount: collectAmount };
              }
              return item;
            }
          )
        );
      }
    }
  }, [collectAmount]);

  const increaseAmount = () => {
    const amountToIncrease = collectAmount + 1;
    if (
      amountToIncrease <= orderItem.quantity &&
      amountToIncrease > orderItem.quantityCollected
    ) {
      setCollectAmount(amountToIncrease);
      setCanReduceAmount(true);
    }
  };

  const reduceAmount = () => {
    const amountToIncrease = collectAmount - 1;
    if (
      amountToIncrease <= orderItem.quantity &&
      amountToIncrease >= orderItem.quantityCollected
    ) {
      setCollectAmount(amountToIncrease);
      setSelectAllItems(false);
      setCanReduceAmount(true);
    }
  };

  return (
    <div className="flex justify-between mb-2 items-end border-2 p-2 rounded-xl">
      <div>
        <div className="text-xl">{orderItem.item?.category?.name}</div>
        <div className="text-2xl font-black">{orderItem.item.name}</div>
      </div>
      <div className="text-3xl flex font-bold items-center gap-2">
        {orderItem.quantity == orderItem.quantityCollected ? (
          <div className="flex items-center gap-4 text-green-700">
            <span className="text-2xl">Fully Collected</span>
            {orderItem.quantityCollected}/{orderItem.quantity}
          </div>
        ) : (
          <>
            <div className="text-green-700">
              {collectAmount - orderItem.quantityCollected > 0 &&
                `+${collectAmount - orderItem.quantityCollected}`}
            </div>
            {collectItems && canReduceAmount && (
              <button
                onClick={reduceAmount}
                className="text-xl p-2 bg-primary text-white rounded-full"
              >
                <FaMinus />
              </button>
            )}
            <div>
              {collectAmount}/{orderItem.quantity}
            </div>
            {collectItems && (
              <button
                onClick={increaseAmount}
                className="text-xl p-2 bg-primary text-white rounded-full"
              >
                <FaPlus />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderItemView;
