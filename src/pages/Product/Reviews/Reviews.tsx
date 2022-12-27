import Review from "./Review";
import ReviewForm from "./ReviewForm/ReviewForm";
import "./Reviews.scss";
import React, { useState } from "react";

interface IProps {
  bookId: string;
}

function Reviews(props: IProps) {
  const [showForm, setShowForm] = useState(false);
  const handleToggleForm = () => setShowForm((prev) => !prev);

  return (
    <div className="reviews">
      <div className="reviews__add-container">
        <div className="reviews__add">
          <p className={`${showForm && "none"}`}>
            Want to share your own thoughts about the book?
          </p>
          <button
            onClick={handleToggleForm}
            className={`${showForm && "center"}`}
          >
            {showForm ? "Close" : "Leave a rating!"}
          </button>
        </div>
        {showForm && <ReviewForm bookId={props.bookId} />}
      </div>
      <Review />
      <Review />
    </div>
  );
}

export default Reviews;
