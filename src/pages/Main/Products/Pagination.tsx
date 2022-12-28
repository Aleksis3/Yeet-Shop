import React from "react";
import "./Pagination.scss";

interface IProps {
  index: number;
  productsCount: number;
  handleChangeIndex: (num: number, operator: string) => void;
}

function Pagination(props: IProps) {
  return (
    <div className="pagination">
      <i
        onClick={() => props.handleChangeIndex(10, "-")}
        className="pagination__arrow"
      >
        {String.fromCharCode(8592)}
      </i>
      <i
        onClick={() => props.handleChangeIndex(10, "+")}
        className="pagination__arrow"
      >
        {String.fromCharCode(8594)}
      </i>
    </div>
  );
}

export default Pagination;
