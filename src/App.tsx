import "./App.scss";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Product from "./pages/Product/Product";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectUserId } from "./redux/authSlice";
import { fetchCart } from "./redux/cartSlice";
import { IBook } from "./types/types";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  const user = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  // code for fetching cart's data
  useEffect(() => {
    const cartRef = collection(db, "test", `${user}`, "cart");
    const fetchData = async () => {
      try {
        onSnapshot(cartRef, (snapshot) => {
          const querySnapshot = snapshot.docs;
          const bookData: IBook[] = [];
          querySnapshot.forEach((doc) => bookData.push(doc.data() as IBook));
          dispatch(fetchCart(bookData));
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
  }, [user, dispatch]);

  return (
    <div className="App">
      <Header />
      <Navbar />
      <main>
        <Routes>
          {["/", "/category/:category/", "/category/:category/:page", "*"].map(
            (path, index) => (
              <Route path={path} key={index} element={<Main />} />
            )
          )}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
