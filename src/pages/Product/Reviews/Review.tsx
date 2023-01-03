import "./Review.scss";
import { IReview } from "../../../redux/reviewSlice";

function Review(props: IReview) {
  const strDate = new Date(
    props!.date!.seconds * 1000 + props!.date!.nanoseconds / 1000000
  ).toLocaleString();

  return (
    <div className="review">
      <div className="review__details">
        <div className="review__details__identifiers">
          <p>Author: {props.author},</p>
          <p>
            on <i>{strDate}</i>
          </p>
        </div>
        <p className="review__rating">
          Rating:
          <span className="review__stars">
            {String.fromCharCode(9733).repeat(props.score)}
          </span>
        </p>
      </div>
      <p className="review__content">{props.content}</p>
    </div>
  );
}

export default Review;
