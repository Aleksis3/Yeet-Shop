import { useState, useEffect } from "react";
import "./StarRating.scss";

interface IProps {
  getScoreInput: (score: number) => void;
}

const StarRating = (props: IProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    props.getScoreInput(rating);
  }, [rating]);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={`star-rating__btn ${
              index <= (hover || rating)
                ? "star-rating__btn--on"
                : "star-rating__btn--off"
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
