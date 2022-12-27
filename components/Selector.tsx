import React, { memo, useState } from "react";

const Selector = ({
  options,
  onSelectOption,
  selectedOption,
}: {
  options: string[];
  onSelectOption: (option: string) => void;
  selectedOption: string | null;
}) => {
  console.log("SELECTOR");
  const [isExpanded, setIsExpanded] = useState(false);
  const selectOptionHandler = (option: string) => {
    onSelectOption(option);
    setIsExpanded((prevState) => !prevState);
  };
  return (
    <div className="relative bg-midnight rounded w-full md:w-2/6 ">
      <button
        className="text-center text-white p-2  ronded w-full"
        onClick={() => setIsExpanded((prevState) => !prevState)}
      >
        Select Vs Currency: {selectedOption}
      </button>
      {isExpanded && (
        <ul className="text-center text-white mt-2 absolute bg-midnight w-4/6 h-60 whitespace-nowrap overflow-y-auto scrollbar-hide rounded">
          {options.map((option) => (
            <li
              onClick={() => selectOptionHandler(option)}
              className="border-b border-gray w-full py-1 hover:bg-gray cursor-pointer"
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(Selector);
