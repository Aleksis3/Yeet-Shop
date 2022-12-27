import React, { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { addReview } from "../../../../redux/reviewSlice";
import "./ReviewForm.scss";
import StarRating from "./StarRating";

interface IProps {
  bookId: string;
}

function ReviewForm({ bookId }: IProps) {
  const [textInput, setTextInput] = useState("");
  const [score, setScore] = useState(0);
  const dispatch = useAppDispatch();

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(addReview({ bookId, content: textInput, score }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.currentTarget.value);
  };

  const getScoreInput = (score: number) => {
    setScore(score);
  };

  return (
    <form className="review-form" onSubmit={(e) => submitForm(e)}>
      <div className="review-form__input-wrapper">
        <p>Your rating:</p>
        <StarRating getScoreInput={getScoreInput} />
      </div>
      <div className="review-form__input-wrapper">
        <label htmlFor="review-form__details">Details:</label>
        <textarea
          className="review-form__content"
          onChange={(e) => handleTextChange(e)}
          value={textInput}
          id="review-form__details"
        ></textarea>
      </div>
      <button className="review-form__submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
