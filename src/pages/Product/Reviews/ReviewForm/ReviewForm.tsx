import { useAppDispatch } from "../../../../redux/hooks";
import { addReview } from "../../../../redux/reviewSlice";
import "./ReviewForm.scss";

interface IProps {
  bookId: string;
}

function ReviewForm(props: IProps) {
  const dispatch = useAppDispatch();
  const handleAdd = () => {
    dispatch(addReview({ bookId: "", content: "", score: 0 }));
  };
  return (
    <form className="review-form">
      <label htmlFor="">Your rating:</label>
    </form>
  );
}

export default ReviewForm;
