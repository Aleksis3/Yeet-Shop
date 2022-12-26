import React from "react";
import "./Button.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};
function Button(props: ButtonProps) {
  return (
    <button className="button className" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
