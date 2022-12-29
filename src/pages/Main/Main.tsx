import { useParams } from "react-router-dom";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";

function Main() {
  // Get the category name that 'll be used
  // as genre header and as a part of query in the API call

  let { category, page } = useParams();

  const title = category?.toUpperCase() || "Fiction Relases";

  return (
    <>
      {!category && <Hero />}
      <Products title={title} category={category} page={page} />
    </>
  );
}

export default Main;
