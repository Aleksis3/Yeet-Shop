import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./Pagination.scss";

interface IProps {
  productsCount: number;
  productsPerPage: number;
  page: number;
  handleChangePage: (page: number) => void;
}

function Pagination(props: IProps) {
  const pageNumbers: number[] = [];

  // calculate the number of all pages by dividing
  // the total number of products by the number of books
  // displayed on single page

  for (
    let i = 1;
    i <= Math.ceil(props.productsCount / props.productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // variables storing the number of the actual page
  // and page references to be displayed along it
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
      <ul className="pagination__pages">{pageEls}</ul>
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
