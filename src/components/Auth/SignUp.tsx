import { useForm } from "react-hook-form";
import { selectUserId, signup } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";

import "./authForm.scss";

interface iFormValues {
  email: string;
  login: string;
  password: string;
  password2: string;
}

interface ISignUp {
  handleClose: () => void;
}

function SignUp(props: ISignUp) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<iFormValues>();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserId);

  // make API call for registering the user if the given
  // passwords match
  const handleRegister = (data: iFormValues) => {
    console.log(data);
    if (data.password === data["password2"]) {
      dispatch(signup({ ...data }));
    } else {
      setError("password", {
        type: "mismatch",
        message: "Passwords do not match!",
      });
    }
  };

  // close the component if the user has signed up successfully
  if (user) {
    props.handleClose();
  }

  return (
    <div>
      <h1 className="auth__form-title">Create new account</h1>
      <form className="auth__form" onSubmit={handleSubmit(handleRegister)}>
        <div className="auth__formEl-wrapper">
          <label htmlFor="login" className="auth__form-label">
            Login
          </label>
          <input
            id="login"
            type="text"
            {...register("login", {
              required: "Field is required",
            })}
            name="login"
          />
        </div>
        <span className="auth__form__error">{errors?.login?.message}</span>
        <div className="auth__formEl-wrapper">
          <label htmlFor="email" className="auth__form-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            {...register("email", {
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email is invalid",
              },
              required: "Field is required",
            })}
            name="email"
          />
        </div>
        <span className="auth__form__error">{errors?.email?.message}</span>
        <div className="auth__formEl-wrapper">
          <label htmlFor="password" className="auth__form-label">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Field is required",
            })}
            name="password"
          />
        </div>
        <span className="auth__form__error">{errors?.password?.message}</span>
        <div className="auth__formEl-wrapper">
          <label htmlFor="password-confirm" className="auth__form-label">
            Confirm Password
          </label>
          <input
            id="password2"
            type="password"
            {...register("password2", {
              required: "Field is required",
            })}
            name="password2"
          />
        </div>
        <span className="auth__form__error">{errors?.password2?.message}</span>
        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default SignUp;
