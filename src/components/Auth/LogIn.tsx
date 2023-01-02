import { useState } from "react";
import { selectUserId, signin } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";

import "./authForm.scss";

interface ILogIn {
  handleClose: () => void;
}

function LogIn(props: ILogIn) {
  const [userInput, setUserInput] = useState({
    email: "fsddfs@gmail.com",
    password: "dfsdfsdfs123",
  });
  const user = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(signin({ ...userInput }));
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput((prevUserInput) => ({
      ...prevUserInput,
      [e.target.id]: e.target.value,
    }));
  };

  if (user) {
    props.handleClose();
  }

  return (
    <div>
      <h1 className="auth__form-title">Sign In</h1>
      <form className="auth__form" action="">
        <div className="auth__formEl-wrapper">
          <label className="auth__form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userInput.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="auth__formEl-wrapper">
          <label className="auth__form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={userInput.password}
            onChange={inputChangeHandler}
          />
        </div>
        <Button className="auth__btn" onClick={(e) => handleRegister(e)}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default LogIn;
