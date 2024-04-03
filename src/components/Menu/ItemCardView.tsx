import Image from "next/image";
import { useEffect } from "react";

interface ItemCardPropsType {
  name: string;
  price: number;
  imageURL?: string;
  onClick?: () => void;
}

export default function ItemCard({
  onClick,
  name,
  price,
  imageURL,
}: ItemCardPropsType) {
  useEffect(() => {
    console.log(name, price);
  }, [name, price]);

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer w-full h-fit rounded-xl overflow-hidden"
    >
      <div className="h-full absolute top-0 w-full bg-primary opacity-50" />
      <div className="absolute top-0 p-2">
        <div className="text-white font-black text-2xl">{name}</div>
        <div className="text-white font-black text-lg">Rs {price}</div>
      </div>
      {imageURL ? (
        <img
          className="w-full h-[200px] object-cover"
          src={imageURL}
          alt={""}
        />
      ) : (
        <div className="m-auto w-full h-[150px] bg-primary" />
      )}
    </div>
  );
}
