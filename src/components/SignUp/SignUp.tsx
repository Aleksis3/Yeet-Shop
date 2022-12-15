import { useState, useContext, useEffect } from "react";
import { auth, registerWithEmailAndPassword } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { signup } from "../../redux/auth";
import { useAppDispatch } from "../../redux/hooks";

import "./SignUp.scss";

interface ISignUp {
  handleClose: () => void;
}

function SignUp(props: ISignUp) {
  const [email, setEmail] = useState(
    "sddfsddffdsfsf@gfdsmail.com"
  );
  const [password, setPassword] = useState("Drafsgs123e");
  const [name, setName] = useState("fsfs");

  const dispatch = useAppDispatch();

 

  const handleRegister = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }));
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => props.handleClose()}>
          &times;
        </span>
        <h1>Create a new account</h1>
        <form className="signUp__form" action="">
          <div className="signUp__formEl-wrapper">
            <label htmlFor="login">Login</label>
            <input id="login" type="text" />
          </div>
          <div className="signUp__formEl-wrapper">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" />
          </div>
          <div className="signUp__formEl-wrapper">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>
          <button className="signUp__btn" onClick={(e) => handleRegister(e)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
