import { SetStateAction, useEffect, useState } from "react";
import React from "react";
import { extractValuesFromTimeStr } from "../../utils/timeValidation";

interface StartEndTimeSelectorPropsType {
  startTime: string;
  setStartTime: React.Dispatch<SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<SetStateAction<string>>;
  initialCategory?: {
    name: string;
    startTime?: string;
    endTime?: string;
  };
}

const StartEndTimeSelector = ({
  setStartTime,
  startTime,
  setEndTime,
  endTime,
  initialCategory,
}: StartEndTimeSelectorPropsType) => {
  return (
    <div className="flex mt-5 w-full gap-4">
      <TimeSelector
        label="Start Time"
        setTime={setStartTime}
        initialTime={initialCategory?.startTime}
        currentTime={startTime}
      />
      <TimeSelector
        label="End Time"
        setTime={setEndTime}
        initialTime={initialCategory?.endTime}
        currentTime={endTime}
      />
    </div>
  );
};

const TimeSelector = ({ label, setTime, currentTime, initialTime }: any) => {
  const [hour, setHour] = useState(1);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<string>("am");

  const validateTime = /^(0[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

  useEffect(() => {
    const newTimeStr =
      String("0" + hour).slice(-2) +
      ":" +
      String("0" + minute).slice(-2) +
      period;
    if (validateTime.test(newTimeStr)) {
      if (newTimeStr != currentTime) {
        setTime(newTimeStr);
      }
    }
  }, [hour, minute, period, setTime]);

  useEffect(() => {
    if (initialTime) {
      const values = extractValuesFromTimeStr(initialTime);
      if (values) {
        setHour(values.hour);
        setMinute(values.minute);
        setPeriod(values.period);
      }
    }
  }, [initialTime]);

  return (
    <div className="relative w-full">
      <div className="text-sm absolute top-[-7px] left-3 bg-white px-2 font-bold">
        {label}
      </div>
      <div className="flex justify-between w-full border-2 border-gray-700 rounded-lg p-3">
        <TimeSelectInput
          timeValue={hour}
          setTimeValue={setHour}
          target="Hours"
          range={12}
        />
        <TimeSelectInput
          timeValue={minute}
          setTimeValue={setMinute}
          target="Minutes"
          range={60}
        />
        <div className="w-full min-w-[50px] px-1 h-fit relative mt-auto flex justify-center flex-wrap">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-3xl text-primary w-full select-none bg-secondary font-black cursor-pointer appearance-none px-2 text-center rounded outline-none"
            name="hour"
            id=""
          >
            <option key="am" value="am">
              am
            </option>
            <option key="pm" value="pm">
              pm
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

interface TimeSelectInputTypes {
  target: string;
  range: number;
  timeValue: number;
  setTimeValue: React.Dispatch<React.SetStateAction<number>>;
}

const TimeSelectInput = ({
  target,
  range,
  timeValue,
  setTimeValue,
}: TimeSelectInputTypes) => {
  const [size, setSize] = useState(0);
  return (
    <div className="w-full min-w-[50px] px-1 relative flex justify-center flex-wrap">
      <div className="text-sm font-bold w-full text-center">{target}</div>
      <select
        onFocus={() => setSize(5)}
        onBlur={() => setSize(0)}
        size={size}
        onChange={(e) => {
          setTimeValue(parseInt(e.target.value));
          setSize(0);
        }}
        value={timeValue}
        className="text-4xl text-primary w-full focus:absolute top-5  select-none bg-secondary font-black cursor-pointer appearance-none px-2 text-center rounded outline-none"
        name="hour"
        id=""
      >
        {Array.from(Array(range).keys()).map((value) => (
          <option
            className="select-none"
            key={value}
            value={target == "Hours" ? value + 1 : value}
          >
            {String("0" + (target == "Hours" ? value + 1 : value)).slice(-2)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StartEndTimeSelector;
