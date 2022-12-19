import { useParams } from "react-router-dom";
import Products from "../../components/Products/Products";

function Category() {
  let { category } = useParams();
  console.log(category);
  return (
    <div>
      <Products category={category} title={category!.toUpperCase()} />
    </div>
  );
}

export default Category;
