import Review from "./Review";
import ReviewForm from "./ReviewForm/ReviewForm";
import "./Reviews.scss";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { selectReviews } from "../../../redux/reviewSlice";
import { fetchReviews } from "../../../redux/reviewSlice";
import Button from "../../../components/Button/Button";
import { selectUserId } from "../../../redux/authSlice";
interface IProps {
  bookId: string;
}

function Reviews(props: IProps) {
  const [showForm, setShowForm] = useState(false);
  const user = useAppSelector(selectUserId);
  const handleToggleForm = () => {
    if (user) {
      setShowForm((prev) => !prev);
    } else {
      alert("You must be logged in!");
    }
  };

  const dispatch = useAppDispatch();
  const collectionRef = collection(db, "books", "reviews", `${props.bookId}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(collectionRef, (snapshot: any) => {
          const querySnapshot = snapshot.docs;
          const reviewData = [] as any;
          querySnapshot.forEach((doc: any) => {
            // doc.data().date = doc.data().date.toDate();
            const data = doc.data();
            data.date = "f";
            reviewData.push(data);
          });

          dispatch(fetchReviews(reviewData));
        });
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          console.log("Unexpected error", e);
        }
      }
    };
    fetchData();
  }, []);

  const reviews = useAppSelector(selectReviews);

  const reviewEls = reviews.map((review) => (
    <Review
      author={review.author}
      score={review.score}
      content={review.content}
      bookId="f"
    />
  ));

  return (
    <div className="reviews">
      <div className="reviews__add-container">
        <div className="reviews__add">
          <p className={`${showForm && "none"}`}>
            Want to share your own thoughts about the book?
          </p>
          <Button
            onClick={handleToggleForm}
            className={`${showForm && "center"}`}
          >
            {showForm ? "Close" : "Leave a rating!"}
          </Button>
        </div>
        {showForm && <ReviewForm bookId={props.bookId} />}
      </div>
      <div>{reviewEls}</div>
    </div>
  );
}

export default Reviews;
