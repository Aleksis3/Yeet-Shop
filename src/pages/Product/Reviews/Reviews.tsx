import Review from "./Review";
import ReviewForm from "./ReviewForm/ReviewForm";
import "./Reviews.scss";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { selectReviews } from "../../../redux/reviewSlice";
import { saveReviews } from "../../../redux/reviewSlice";
import Button from "../../../components/Button/Button";
import { selectUserLogin } from "../../../redux/authSlice";
import Spinner from "../../../components/Spinner/Spinner";
interface IProps {
  bookId: string;
}

function Reviews(props: IProps) {
  const [showForm, setShowForm] = useState(false);
  const [alreadyPosted, setAlreadyPosted] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserLogin);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>();

  // give access to form for adding a review
  // only to logged in users
  const handleToggleForm = () => {
    if (user) {
      if (alreadyPosted) {
        alert("Sorry, only one review per user!");
      } else {
        setShowForm((prev) => !prev);
      }
    } else {
      alert("You must be logged in!");
    }
  };

  // fetch reviews for the current book
  useEffect(() => {
    const fetchData = async () => {
      const reviewsRef = collection(db, "books", "reviews", `${props.bookId}`);
      try {
        onSnapshot(reviewsRef, (snapshot: any) => {
          const querySnapshot = snapshot.docs;
          const reviewData = [] as any;
          querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            if (data.author === user) {
              setAlreadyPosted(true);
            }
            reviewData.push(data);
          });
          dispatch(saveReviews(reviewData));
        });
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          console.log("Unexpected error", e);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [showForm, dispatch, user, props.bookId]);

  const reviews = useAppSelector(selectReviews);

  const reviewEls = reviews.map((review) => (
    <Review
      author={review.author}
      date={review.date}
      score={review.score}
      content={review.content}
      id={review.id}
      key={review.id}
      bookId={review.bookId}
    />
  ));

  let content;
  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = <p>Sorry :c, an error occured: {error}</p>;
  } else {
    content = reviewEls;
  }

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
        {showForm && (
          <ReviewForm
            bookId={props.bookId}
            closeForm={() => setShowForm(false)}
          />
        )}
      </div>
      <div>
        {content}
        <Review
          author="author"
          score={4}
          content={
            "hardcoded review example says lorem and gives this book solid 4/5"
          }
          bookId={"ff"}
          date={{ seconds: 30, nanoseconds: 33 }}
        />
      </div>
    </div>
  );
}

export default Reviews;
