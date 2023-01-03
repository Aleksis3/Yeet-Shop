import React, { useState } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { addReview } from "../../../../redux/reviewSlice";
import "./ReviewForm.scss";
import StarRating from "./StarRating";

interface IProps {
  bookId: string;
  closeForm: () => void;
}

function ReviewForm({ bookId, closeForm }: IProps) {
  const [textInput, setTextInput] = useState("");
  const [score, setScore] = useState(0);
  const dispatch = useAppDispatch();

  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(addReview({ bookId, content: textInput, score }));
    closeForm();
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.currentTarget.value);
  };

  const handleScoreInput = (score: number) => {
    setScore(score);
  };

  return (
    <form className="review-form" onSubmit={(e) => submitForm(e)}>
      <div className="review-form__input-wrapper">
        <p>Your rating:</p>
        <StarRating getScoreInput={handleScoreInput} />
      </div>
      <div className="review-form__input-wrapper">
        <label htmlFor="review-form__details">Details:</label>
        <textarea
          className="review-form__content"
          onChange={(e) => handleTextInput(e)}
          value={textInput}
          id="review-form__details"
        ></textarea>
      </div>
      <button className="review-form__submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
