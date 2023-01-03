import { useParams } from "react-router-dom";
import Hero from "./Hero/Hero";
import Products from "./Products/Products";

function Main() {
  // Get the category name that 'll be used
  // as a genre header and as a part of query in the API call
  // or provide a default case for possibly more specific entry page contents

  // alas due to limited API functionalities used just a general genre
  let { category, page } = useParams();
  const title = category?.toUpperCase() || "Fiction Relases";

  return (
    <>
      {!category && <Hero />}
      <Products title={title} category={category || "fiction"} page={page} />
    </>
  );
}

export default Main;
