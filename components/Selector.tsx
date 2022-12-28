import React, { memo, ReactNode, useState } from "react";

const Selector = ({
  options,
  onSelectOption,
  selectedOption,
  selectorText,
  classes = "",
}: {
  options: string[];
  onSelectOption: (option: string) => void;
  selectedOption: string | null;
  selectorText: string | ReactNode;
  classes?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectOptionHandler = (option: string) => {
    onSelectOption(option);
    setIsExpanded((prevState) => !prevState);
  };
  return (
    <div className={`relative bg-midnight rounded ${classes}`}>
      <button
        className="text-center text-white p-2  ronded w-full"
        onClick={() => setIsExpanded((prevState) => !prevState)}
      >
        {selectorText}: {selectedOption}
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
