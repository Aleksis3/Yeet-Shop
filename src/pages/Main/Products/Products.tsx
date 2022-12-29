import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import ProductItem from "./Product/ProductItem";
import "./Products.scss";

interface Response {
  id: number;
  volumeInfo: {
    title: string;
    subtitle: string;
    imageLinks: {
      thumbnail: string;
    };
  };
  // industryIdentifers: {
  //   imageLinks: any[];
  // };
  saleInfo: {
    listPrice: {
      amount: number;
    };
    isEbook: boolean;
  };
  authors: string[];
  description: string;
}

interface IProductsProps {
  category?: string;
  title: string;
  page?: string;
}

function Products(props: IProductsProps) {
  const [products, setProducts] = useState<Response[]>([]);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState((props.page && parseInt(props.page)) || 1);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const productsPerPage = 25;
  // change API's call starting index in accordance to clicked
  // page button

  // set current index to 0 after switching categories
  useEffect(() => {
    setPage(1);
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
      // navigate("/3");
      setPage(pageNumber);
    }
  };

  // in the case in wich user decides to sort through all
  // using the home page
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${
            props.category || "fiction"
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
          (book: any) => book.saleInfo.isEbook !== false
        );

        setProducts(filteredJson);

        // the current count may vary a little
        // from the one stated in API response
        // but the difference is almost negligible

        setProductsCount(json.totalItems);
      } catch (e: any) {
        alert(e.error.message);
        console.error(e);
      }
    };
    fetchData();
  }, [props.category, page]);

  console.log(products);

  // map fetched results to single Product components

  const productEls = products?.map((product) => {
    return (
      <ProductItem
        title={product.volumeInfo.title || "Unknown"}
        key={product.id}
        id={product.id}
        price={product.saleInfo?.listPrice?.amount || 0}
        img={`${product.volumeInfo?.imageLinks?.thumbnail}` || ""}
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
      />
    </section>
  );
}

export default Products;
