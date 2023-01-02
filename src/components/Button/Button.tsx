import React from "react";
import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (any: any) => void;
  className?: string;
};
function Button(props: ButtonProps) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
