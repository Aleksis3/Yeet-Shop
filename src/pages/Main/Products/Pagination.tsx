import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Pagination.scss";
import React from "react";

interface IProps {
  productsCount: number;
  page: number;
  handleChangePage: (page: number) => void;
}

function Pagination(props: IProps) {
  const pageNumbers: number[] = [];

  // make a page squared reference for the result of
  // all available books divided by the number of how many
  // are displayed on each one

  for (let i = 1; i <= Math.ceil(props.productsCount / 25); i++) {
    pageNumbers.push(i);
  }

  const rightSiblings = pageNumbers.filter(
    (number) => number >= props.page && number < props.page + 4
  );

  const leftSiblings = pageNumbers.filter(
    (number) => number < props.page && number > props.page - 3
  );

  const siblings = [...leftSiblings, ...rightSiblings];
  const pageEls = siblings.map((number) => (
    <li
      key={number}
      className={`pagination__page ${
        number === props.page ? "pagination__page--current" : ""
      }`}
      onClick={() => props.handleChangePage(number)}
    >
      {number}
    </li>
  ));

  return (
    <div className="pagination">
      <i
        onClick={() => props.handleChangePage(1)}
        className="pagination__arrow"
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </i>
      <i
        onClick={() => props.handleChangePage(props.page - 1)}
        className="pagination__arrow"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </i>
      {pageEls}
      <i
        onClick={() => props.handleChangePage(props.page + 1)}
        className="pagination__arrow"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </i>
      <i
        onClick={() => props.handleChangePage(pageNumbers.length)}
        className="pagination__arrow"
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </i>
    </div>
  );
}

export default Pagination;
