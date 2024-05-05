import React, { useEffect, useState } from "react";
import { Item, Order, OrderItem } from "../../types";
import Modal from "../../components/Modal";
import { FaMinus, FaPlus } from "react-icons/fa";
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
  const [collectItemCountList, setCollectItemCountList] = useState({});
  const [makeItemCollection, setMakeItemCollection] = useState(false);

  useEffect(() => {
    setCollectItemCountList(
      orderDetails.items.map((item) => {
        return { itemId: item.id, collectAmount: item.quantityCollected };
      })
    );
  }, []);

  useEffect(() => {
    console.log(collectItemCountList);
  }, [collectItemCountList]);

  return (
    <Modal closeFunc={() => setSelectedOrder(null)}>
      <>
        <div className="w-[600px] mt-2">
          <div className="font-bold">{orderDetails.id}</div>
          <div className="flex justify-between text-xl">
            <div className="font-bold"> {orderDetails.customer.name}</div>
            <div>{new Date(orderDetails.orderTime).toLocaleTimeString()}</div>
          </div>
          <div className="mt-5 h-[400px] overflow-auto">
            {orderDetails.items.map((orderItem) => (
              <OrderItemView
                orderItem={orderItem}
                collectItems={collectItems}
                selectAllItems={selectAllItems}
                collectItemCountList={collectItemCountList}
                setCollectItemCountList={setCollectItemCountList}
                setSelectAllItems={setSelectAllItems}
              />
            ))}
          </div>

          <div className="w-fit mt-4 gap-2 float-right">
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
                  onClick={() => setMakeItemCollection(true)}
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
