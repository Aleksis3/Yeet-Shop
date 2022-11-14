import { useParams } from "react-router-dom";
import Products from "../../components/Products/Products";

function Category() {
  let { category } = useParams();
  return (
    <div>
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        saepe autem mollitia nostrum placeat beatae ab et harum quisquam
        sapiente tenetur officiis optio corrupti fugit a voluptatem ipsa, quo
        laboriosam!
      </div>
      <Products category={category} />
    </div>
  );
}

export default Category;
