import React, { memo } from "react";
import { Button } from "../types";

const Button = ({ handler, isDisabled, classes, text }: Button) => {
  console.log("render");
  return (
    <button onClick={handler} disabled={isDisabled} className={classes}>
      {text}
    </button>
  );
};

export default memo(Button);
