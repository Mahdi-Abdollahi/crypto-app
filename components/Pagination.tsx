import React from "react";
import { Pagination } from "../types";
import Button from "./Button";

const Pagination = ({
  currentPage,
  previousPageHandler,
  nextPageHandler,
  isNextButtonDisabled,
  isPrevButtonDisabled,
  nextButtonText,
  prevButtonText,
  nextButtonClasses,
  prevButtonClasses,
}: Pagination) => {
  return (
    <div className="w-4/6 mx-auto flex flex-row items-center justify-between mt-6">
      <Button
        handler={previousPageHandler}
        text={prevButtonText}
        isDisabled={isPrevButtonDisabled}
        classes={prevButtonClasses}
      />
      <div className="text-white">{currentPage}</div>
      <Button
        handler={nextPageHandler}
        text={nextButtonText}
        isDisabled={isNextButtonDisabled}
        classes={nextButtonClasses}
      />
    </div>
  );
};

export default Pagination;
