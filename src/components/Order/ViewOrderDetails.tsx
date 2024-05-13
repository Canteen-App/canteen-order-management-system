import React, { useEffect, useState } from "react";
import { Order } from "../../types";
import Modal from "../../components/Modal";
import OrderItemView from "./OrderItemView";
import OrderCollectionConfirm from "./OrderCollectionConfirm";

const ViewOrderDetails = ({
  orderDetails,
  setSelectedOrder,
}: {
  orderDetails: Order;
  setSelectedOrder: any;
}) => {
  const [collectItems, setCollectItems] = useState(false);
  const [selectAllItems, setSelectAllItems] = useState(false);
  const [collectItemCountList, setCollectItemCountList] = useState<any>([]);
  const [makeItemCollection, setMakeItemCollection] = useState(false);

  useEffect(() => {
    setCollectItemCountList(
      orderDetails.items.map((item) => {
        return { itemId: item.id, collectAmount: item.quantityCollected };
      })
    );
  }, [orderDetails]);

  const displayConfimCollection = () => {
    for (let collectItemCount of collectItemCountList) {
      if (collectItemCount.collectAmount > 0) {
        const orderItemDetails = orderDetails.items.find(
          (item) => item.id == collectItemCount.itemId
        );
        if (orderItemDetails) {
          if (
            orderItemDetails.quantityCollected < collectItemCount.collectAmount
          ) {
            setMakeItemCollection(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (selectAllItems) {
      setCollectItemCountList(
        collectItemCountList.map(
          (collectItemCount: { itemId: string; collectAmount: number }) => {
            const orderItemDetails = orderDetails.items.find(
              (item) => item.id == collectItemCount.itemId
            );
            if (orderItemDetails) {
              collectItemCount.collectAmount = orderItemDetails.quantity;
              return collectItemCount;
            }
          }
        )
      );
    }
  }, [selectAllItems]);

  return (
    <Modal closeFunc={() => setSelectedOrder(null)}>
      <>
        <div className="w-[600px] mt-2">
          <div>{orderDetails.id}</div>
          <div className="flex justify-between text-xl">
            <div className="font-black text-2xl"> {orderDetails.customer.name}</div>
          </div>
          <div className="mt-5 h-[400px] overflow-auto">
            {orderDetails.items.map((orderItem, index) => (
              <OrderItemView
                key={index}
                orderItem={orderItem}
                collectItems={collectItems}
                collectItemCountList={collectItemCountList}
                setCollectItemCountList={setCollectItemCountList}
                selectAllItems={selectAllItems}
                setSelectAllItems={setSelectAllItems}
              />
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <p>Total Amount </p>
              <p>Rs {orderDetails.payment.totalAmount.toLocaleString()}</p>
            </div>
            <div className="w-fit mt-4 gap-2">
              {collectItems ? (
                <>
                  <div className="">
                    <div
                      onClick={() => setSelectAllItems(true)}
                      className={`w-fit px-2 py-1 rounded-lg border-2 ${
                        selectAllItems
                          ? "bg-primary text-white"
                          : "border-primary text-primary hover:border-white cursor-pointer"
                      } hover:bg-primary hover:text-white font-bold text-xl`}
                    >
                      Select All Items
                    </div>
                  </div>
                  <button
                    onClick={displayConfimCollection}
                    className="w-fit p-2 mt-2 float-right rounded-xl bg-primary text-white font-bold text-xl"
                  >
                    Collect Items
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCollectItems(true)}
                  className="w-fit p-2 mt-2 float-right rounded-xl bg-primary text-white font-bold text-xl"
                >
                  Collect Items
                </button>
              )}
            </div>
          </div>
        </div>
        {makeItemCollection && (
          <OrderCollectionConfirm
            setMakeItemCollection={setMakeItemCollection}
            orderDetails={orderDetails}
            collectItemCountList={collectItemCountList}
          />
        )}
      </>
    </Modal>
  );
};

export default ViewOrderDetails;
