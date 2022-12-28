import "./Review.scss";

import { IReview } from "../../../redux/reviewSlice";

function Review(props: IReview) {
  return (
    <div className="review">
      <div className="review__details">
        <div className="review__details__identifiers">
          <p>Author: {props.author},</p>
          <p>
            on <i>13.12.2022</i> {props.date}
          </p>
        </div>
        <p className="a">
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
