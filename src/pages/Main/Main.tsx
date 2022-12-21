import { useParams } from "react-router-dom";
import Hero from "../../components/Hero/Hero";
import Products from "../../components/Products/Products";

function Main() {
  // Incept the category name to be used both in title
  // and in API call from the url param,
  // and if there's none show header and use defaults

  let { category } = useParams();
  console.log(category);
  const title = category?.toUpperCase() || "Newly Added";

  return (
    <>
      {!category && <Hero />}
      <Products title={title} category={category} />
    </>
  );
}

export default Main;
