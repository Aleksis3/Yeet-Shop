import "./Review.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { addReview } from "../../../redux/reviewSlice";

function Review() {
  //   const dispatch = useAppDispatch();
  //   const handleAdd = () => {
  //     dispatch(addReview({ bookId: "", content: "", score: 0 }));
  //   };

  return (
    <div className="review">
      <div className="review__details">
        <p>Author: xxxx</p>
        <p>Rating: {String.fromCharCode(9734).repeat(3)}</p>
        <p>Date: 21.08.2022</p>
      </div>
      {/* <button onClick={handleAdd}>fdasdasdasdasdasdass</button> */}
      <p className="review__content">Good shit, 'd reccc xoxoxoxoxoxo</p>
    </div>
  );
}

export default Review;
