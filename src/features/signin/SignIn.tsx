import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { signinAsync, selectSignIn } from "./signinSlice";
import styles from "./signin.module.css";
import { ButtonSignInUp } from "../../components/Button.styled";

export function SignIn() {
  const auth = useAppSelector(selectSignIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, []);

  return (
    <div className={styles.container + " " + styles.background}>
      <div className={styles.signinBox}>
        <h1 className={styles.h1}>Sign In</h1>
        <form className={styles.form}>
          <label className={styles.label}>Username</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <div className={styles.link}>
          <a>
            <Link to="/signup">
              Don't have an account? <br /> Sign Up
            </Link>
          </a>
          <a>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </a>
        </div>
        <div className={styles.button_container}>
          <ButtonSignInUp
            onClick={() => {
              dispatch(
                signinAsync({ username: username, password: password })
              ).then(() => {
                navigate("/");
              });
            }}
          >
            Sign In
          </ButtonSignInUp>
        </div>
      </div>
    </div>
  );
}
