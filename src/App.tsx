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
import { selectUser } from "./redux/authSlice";
import { fetchCart } from "./redux/cartSlice";
import { IBook } from "./types/types";

function App() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const collectionRef = collection(db, "test", `${user}`, "cart");

  useEffect(() => {
    const fetchData = async () => {
      try {
        onSnapshot(collectionRef, (snapshot: any) => {
          const querySnapshot = snapshot.docs;
          const bookData: IBook[] = [];
          querySnapshot.forEach((doc: any) => bookData.push(doc.data()));
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
  }, [user]);

  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        {["/", "/category/:category"].map((path) => (
          <Route path={path} element={<Main />} />
        ))}
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
