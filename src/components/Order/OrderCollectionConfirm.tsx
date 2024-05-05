import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { Order, OrderItem } from "@/src/types";
import Script from "next/script";
import OrderVerifyInput from "./OrderVerifyInput";

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

  useEffect(() => {
    const details = collectItemCountList
      .map((collectItemCount: { collectAmount: number; itemId: string }) => {
        if (collectItemCount.collectAmount > 0) {
          const orderItemDetails = orderDetails.items.find(
            (item) => item.id == collectItemCount.itemId
          );
          if (orderItemDetails) {
            return {
              collectAmount: collectItemCount.collectAmount,
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

  return (
    <Modal closeFunc={() => setMakeItemCollection(false)}>
      <div className="w-[500px] rounded-xl">
        <Script
          dangerouslySetInnerHTML={{
            __html: `
            `,
          }}
        />
        <div>Order Item Collection</div>
        <div>
          {collectListDetails &&
            collectListDetails.length > 0 &&
            collectListDetails.map((collectItemDetails) => (
              <div className="p-4 border-2 rounded-xl my-4 flex justify-between items-center">
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
                            (collectItemDetails.itemDetails.quantityCollected +
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
            ))}
        </div>
        <OrderVerifyInput length={5} onComplete={() => {}} />
      </div>
    </Modal>
  );
};

export default OrderCollectionConfirm;
