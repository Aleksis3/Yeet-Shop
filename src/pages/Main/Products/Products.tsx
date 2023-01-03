import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProductsResponse } from "../../../types/types";
import Pagination from "./Pagination";
import ProductItem from "./Product/ProductItem";
import "./Products.scss";

interface IProductsProps {
  category?: string;
  title: string;
  page?: string;
}

function Products(props: IProductsProps) {
  const [products, setProducts] = useState<IProductsResponse[]>([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState((props.page && parseInt(props.page)) || 1);

  const navigate = useNavigate();
  const location = useLocation();

  const productsPerPage = 25;

  // set current page to 1 after category switch
  // the code uses additional ref to make sure
  // it doesn't fire upon initial mount
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      setPage(1);
    } else {
      didMount.current = true;
    }
  }, [props.category]);

  // allow for the page change as long as given number
  // is higer than 0 and lower or equal
  // to the last one

  const handleChangePage = (pageNumber: number) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(productsCount / productsPerPage)
    ) {
      window.scrollTo(0, 0);
      if (location.pathname === "/") {
        navigate(`/category/fiction/${pageNumber}`);
      } else {
        navigate(`/category/${props.category}/${pageNumber}`);
      }
      setPage(pageNumber);
    }
  };

  // fetch the book items from the given category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${
            props.category
          }&filter=paid-ebooks&download=epub&langRestrict=en&maxResults=25&sort=newest&startIndex=${
            (page - 1) * productsPerPage
          }`
        );
        if (!data.ok) {
          const err = await data.json();
          throw err;
        }
        const json = await data.json();

        // solution for very rare cases in which the returned API
        // response ignores the query and contains results which are
        // neither ebooks nor for sale (possibly just the case of preorders)

        const filteredJson = json.items.filter(
          (book: IProductsResponse) => book.saleInfo.isEbook !== false
        );

        setProducts(filteredJson);

        // the current count may vary a little
        // from the one stated in API response
        // but the difference is almost negligible

        setProductsCount(json.totalItems);
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("Oops, there was some error!");
        }
      }
    };
    fetchData();
  }, [props.category, page]);

  // map fetched results to individual Product components

  const productEls = products?.map((product) => {
    return (
      <ProductItem
        title={product.volumeInfo.title}
        key={product.id}
        id={product.id}
        price={product.saleInfo?.listPrice?.amount}
        img={`${product.volumeInfo?.imageLinks?.thumbnail}`}
      />
    );
  });

  return (
    <section className="products">
      <h2 className="products__heading">{`${props.title} (${productsCount})`}</h2>
      <div className="products__grid">{productEls}</div>
      <Pagination
        page={page}
        productsCount={productsCount}
        handleChangePage={handleChangePage}
        productsPerPage={productsPerPage}
      />
    </section>
  );
}

export default Products;
