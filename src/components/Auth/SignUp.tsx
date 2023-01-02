import { useState } from "react";
import { selectUserId, signup } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";

import "./authForm.scss";

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

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserId);

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
      <h1 className="auth__form-title">Create a new account</h1>
      <form className="auth__form" action="">
        <div className="auth__formEl-wrapper">
          <label htmlFor="login" className="auth__form-label">
            Login
          </label>
          <input
            id="login"
            type="text"
            value={userInput.login}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="auth__formEl-wrapper">
          <label htmlFor="email" className="auth__form-label">
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
          <label htmlFor="password" className="auth__form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={userInput.password}
            onChange={inputChangeHandler}
          />
        </div>
        <Button onClick={(e) => handleRegister(e)}>Submit</Button>
      </form>
    </div>
  );
}

export default SignUp;
