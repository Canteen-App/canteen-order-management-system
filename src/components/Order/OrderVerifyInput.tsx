import React, { useEffect, useRef, useState } from "react";

// declare type for the props

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

const OrderVerifyInput = ({ length = 4, onComplete }: InputProps) => {
  // if you're not using Typescript, simply do const inputRef = useRef()

  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  // if you're not using Typescript, do useState()
  const [pin, setPin] = useState<string[]>(Array(length).fill(""));

  const handleTextChange = (input: string, index: number) => {
    // Allow only numeric characters
    input = input.replace(/\D/g, ""); // Replace non-numeric characters with an empty string

    const newPin = [...pin];
    newPin[index] = input;
    setPin(newPin);

    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    onComplete(newPin.join(""));
  };

  return (
    <div>
      <div className={`w-full flex items-center justify-center`}>
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={pin[index]}
            onChange={(e) => handleTextChange(e.target.value, index)}
            //@ts-expect-error Expect legacy type error
            ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
            className={`border border-primary focus:border-blue-600 p-4 w-[75px] text-center rounded-xl text-5xl outline-none`}
            style={{ marginRight: index === length - 1 ? "0" : "10px" }}
          />
        ))}
      </div>
      <div className="text-xl text-center">
        Get User's Order Verification Code
      </div>
    </div>
  );
};

export default OrderVerifyInput;
