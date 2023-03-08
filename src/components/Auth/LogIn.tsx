import { useForm } from "react-hook-form";
import { selectUserId, signin } from "../../redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Button from "../Button/Button";

import "./authForm.scss";

interface iFormValues {
  email: string;
  password: string;
}

interface ILogIn {
  handleClose: () => void;
}

function LogIn(props: ILogIn) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iFormValues>();

  const user = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleLogIn = (data: iFormValues) => {
    dispatch(signin({ ...data }));
  };

  if (user) {
    props.handleClose();
  }

  return (
    <div>
      <h1 className="auth__form-title">Sign In</h1>
      <form onSubmit={handleSubmit(handleLogIn)} className="auth__form">
        <div className="auth__formEl-wrapper">
          <label className="auth__form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            {...register("email", {
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email is invalid",
              },
              required: "Email is required",
            })}
            name="email"
          />
        </div>
        <span className="auth__form__error">{errors?.email?.message}</span>
        <div className="auth__formEl-wrapper">
          <label className="auth__form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            name="password"
          />
        </div>
        <span className="auth__form__error">{errors?.password?.message}</span>
        <Button className="auth__btn">Submit</Button>
      </form>
    </div>
  );
}

export default LogIn;
