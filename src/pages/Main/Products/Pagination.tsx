import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Pagination.scss";

interface IProps {
  productsCount: number;
  page: number;
  handleChangePage: (page: number) => void;
}

function Pagination(props: IProps) {
  const pageNumbers = [];

  // make a page squared reference for the result of
  // all available books divided by the number of how many
  // are displayed on each one

  for (let i = 1; i <= Math.ceil(props.productsCount / 25); i++) {
    pageNumbers.push(i);
  }

  const pageEls = pageNumbers.map((number) => (
    <li
      key={number}
      className="pagination__page-number"
      onClick={() => props.handleChangePage(number)}
    >
      {number}
    </li>
  ));

  return (
    <div className="pagination">
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
    </div>
  );
}

export default Pagination;
