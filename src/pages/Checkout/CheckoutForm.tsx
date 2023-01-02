import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import "./CheckoutForm.scss";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { cleanCart } from "../../redux/cartSlice";

function CheckoutForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    name: "",
    surname: "",
    "address-1": "",
    "address-2": "",
    city: "",
    province: "",
    postal: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(cleanCart());
    navigate("/");
  };

  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.currentTarget;
    setUserInput((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="checkout-form">
      <div className="checkout-form__input-wrapper">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          required
          onChange={getInput}
          value={userInput.name}
        />
      </div>
      <div className="checkout-form__input-wrapper">
        <label htmlFor="surname">Surname:</label>
        <input
          type="text"
          id="surname"
          onChange={getInput}
          value={userInput.surname}
          required
        />
      </div>
      <div className="checkout-form__input-wrapper">
        <label htmlFor="address-1">Address Line 1:</label>
        <input
          type="text"
          id="address-1"
          onChange={getInput}
          value={userInput["address-1"]}
          required
        />
      </div>
      <div className="checkout-form__input-wrapper">
        <label htmlFor="address-2">Address Line 2:</label>
        <input
          type="text"
          id="address-2"
          onChange={getInput}
          value={userInput["address-2"]}
          required
        />
      </div>
      <div className="checkout-form__input-wrapper">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          onChange={getInput}
          value={userInput.city}
          required
        />
      </div>
      <div className="checkout-form__input-wrapper">
        <label htmlFor="province">Province:</label>
        <input
          type="text"
          id="province"
          onChange={getInput}
          value={userInput.province}
          required
        />
      </div>
      <div className="checkout-form__input-wrapper">
        <label htmlFor="postal">Postal Code:</label>
        <input
          type="number"
          id="postal"
          onChange={getInput}
          value={userInput.postal}
          required
        />
      </div>
      <button className="checkout-form__button">Proceed To Payment</button>
    </form>
  );
}

export default CheckoutForm;
