import { useState } from "react";
import { selectUser, signup } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import "./SignUp.scss";

interface ISignUp {
  handleClose: () => void;
}

function SignUp(props: ISignUp) {
  const [userInput, setUserInput] = useState({
    login: "dfsdfsdfs",
    email: "fsddfs@gmail.com",
    password: "dfsdfsdfs123",
    confirmPassword: "",
  });
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(signup({ ...userInput }));
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
      <h1 className="signUp__form-title">Create a new account</h1>
      <form className="signUp__form" action="">
        <div className="signUp__formEl-wrapper">
          <label htmlFor="login" className="signUp__form-label">
            Login
          </label>
          <input
            id="login"
            type="text"
            value={userInput.login}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="signUp__formEl-wrapper">
          <label htmlFor="email" className="signUp__form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={userInput.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="signUp__formEl-wrapper">
          <label htmlFor="password" className="signUp__form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={userInput.password}
            onChange={inputChangeHandler}
          />
        </div>
        <button className="signUp__btn" onClick={(e) => handleRegister(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUp;
