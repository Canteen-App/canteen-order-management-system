import Image from "next/image";

interface ItemCardPropsType {
  name: string;
  price: number;
  imageURL: string;
}

export default function ItemCard({ name, price, imageURL }: ItemCardPropsType) {
  return (
    <div className="relative cursor-pointer w-full h-fit rounded-xl overflow-hidden">
      <div className="h-full absolute top-0 w-full bg-primary opacity-50" />
      <div className="absolute top-0 p-2">
        <div className="text-white font-black text-2xl">{name}</div>
        <div className="text-white font-black text-lg">Rs {price}</div>
      </div>
      <Image
        className="m-auto"
        width={150}
        height={120}
        src={imageURL}
        alt={""}
      />
    </div>
  );
}
