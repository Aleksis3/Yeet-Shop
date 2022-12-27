import Review from "./Review";
import ReviewForm from "./ReviewForm/ReviewForm";
import "./Reviews.scss";

interface IProps {
  bookId: string;
}

function Reviews(props: IProps) {
  return (
    <div className="reviews">
      <div className="reviews__add-container">
        <div className="reviews__add">
          <p>Want to share your own thoughts about the book?</p>
          <button>Leave a rating!</button>
        </div>
        <ReviewForm bookId={props.bookId} />
      </div>
      <Review />
      <Review />
    </div>
  );
}

export default Reviews;
