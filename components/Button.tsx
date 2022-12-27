import React from "react";
import { Button } from "../types";

const Button = ({ handler, isDisabled, classes, text }: Button) => {
  return (
    <button onClick={handler} disabled={isDisabled} className={classes}>
      {text}
    </button>
  );
};

export default Button;
