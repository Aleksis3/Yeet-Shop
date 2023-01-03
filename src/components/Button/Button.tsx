import React from "react";
import "./Button.scss";

interface IProps {
  children: React.ReactNode;
  onClick?: (any: any) => void;
  className?: string;
}

function Button(props: IProps) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
