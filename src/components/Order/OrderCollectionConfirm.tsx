import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { Order, OrderItem } from "../../../src/types";
import OrderVerifyInput from "./OrderVerifyInput";
import { orderCollection } from "../../..//src/services/orders";

const OrderCollectionConfirm = ({
  setMakeItemCollection,
  orderDetails,
  collectItemCountList,
}: {
  setMakeItemCollection: any;
  orderDetails: Order;
  collectItemCountList: any;
}) => {
  const [collectListDetails, setCollectListDetails] = useState<
    {
      collectAmount: number;
      itemDetails: OrderItem;
    }[]
  >([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const details = collectItemCountList
      .map((collectItemCount: { collectAmount: number; itemId: string }) => {
        if (collectItemCount.collectAmount > 0) {
          const orderItemDetails = orderDetails.items.find(
            (item) => item.id == collectItemCount.itemId
          );
          if (
            orderItemDetails &&
            orderItemDetails.quantityCollected < orderItemDetails.quantity
          ) {
            return {
              collectAmount:
                collectItemCount.collectAmount -
                orderItemDetails.quantityCollected,
              itemDetails: orderItemDetails,
            };
          }
        }
        return null;
      })
      .filter((detail: any) => detail !== null) as {
      collectAmount: number;
      itemDetails: OrderItem;
    }[];

    console.log(details);
    setCollectListDetails(details);
  }, []);

  const confirmCollection = async () => {
    if (code && code.length == 6) {
      await orderCollection(
        orderDetails.id,
        code,
        collectListDetails.map((item) => {
          return {
            itemId: item.itemDetails.id,
            collectAmount: item.collectAmount,
          };
        })
      );
      setMakeItemCollection(false);
    }
  };
  
  return (
    <Modal closeFunc={() => setMakeItemCollection(false)}>
      <div className="w-[500px] rounded-xl">
        <div className="text-2xl">Order Item Collection</div>
        <div>
          {collectListDetails &&
            collectListDetails.length > 0 &&
            collectListDetails.map((collectItemDetails, index) => (
              <>
                {collectItemDetails.collectAmount > 0 && (
                  <div
                    key={index}
                    className="p-4 border-2 rounded-xl my-4 flex justify-between items-center"
                  >
                    <div className="">
                      <div className="text-xl font-bold">
                        {collectItemDetails.itemDetails.billedItemName}
                      </div>
                      <div>
                        {collectItemDetails.itemDetails.quantity -
                          (collectItemDetails.itemDetails.quantityCollected +
                            collectItemDetails.collectAmount) >
                        0 ? (
                          <>
                            After Collection Remaining:
                            <span className="font-bold pl-2">
                              {collectItemDetails.itemDetails.quantity -
                                (collectItemDetails.itemDetails
                                  .quantityCollected +
                                  collectItemDetails.collectAmount)}
                            </span>
                          </>
                        ) : (
                          <div className="text-green-700 font-bold">
                            Fully Collected
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-4xl font-bold">
                      {collectItemDetails.collectAmount}
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
        <OrderVerifyInput length={6} onComplete={(pin) => setCode(pin)} />
        <div className="flex justify-center mt-4">
          <div
            onClick={confirmCollection}
            className="font-bold cursor-pointer text-white text-2xl bg-primary p-2 rounded-lg w-fit"
          >
            Comfirm Collection
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderCollectionConfirm;
