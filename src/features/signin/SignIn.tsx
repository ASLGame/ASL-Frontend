import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { signinAsync, selectSignIn, selectSignInLoading } from "./signinSlice";
import styles from "./signin.module.css";
import { ButtonSignInUp } from "../../components/Button.styled";
import { setLoading } from "./signinSlice";
import { Store } from "react-notifications-component";

export default function SignIn() {
  const auth = useAppSelector(selectSignIn);
  const signInLoading = useAppSelector(selectSignInLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  function signInErrorNotification() {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#9698D6",
          borderLeft: "8px solid #4D4CAC",
        }}
      >
        <div>
          <h3>Sign In Error</h3>
          <p>Please check username and password.</p>
        </div>
      </div>
    );
  }
  const signIn = () => {
    usernameOrEmail.includes("@")
      ? dispatch(signinAsync({ email: usernameOrEmail, password: password }))
      : dispatch(
          signinAsync({ username: usernameOrEmail, password: password })
        );
  };

  useEffect(() => {
    setTimeout(() => Store.removeAllNotifications(), 3000);
  }, []);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
    if (signInLoading === "rejected") {
      Store.addNotification({
        content: signInErrorNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
        id: "hintPopup",
      });
      dispatch(setLoading("idle"));
    }
  }, [auth, signInLoading, navigate, dispatch]);

  return (
    <div className={styles.container + " " + styles.background}>
      <div className={styles.signinBox}>
        <h1 className={styles.h1}>Sign In</h1>
        <form className={styles.form}>
          <label className={styles.label}>Username or Email</label>
          <input
            className={styles.input}
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            onChange={(e) => setUsernameOrEmail(e.target.value.toLowerCase())}
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
            <Link to="/forgot-password">Forgot Password?</Link>
          </a>
        </div>
        <div className={styles.button_container}>
          <ButtonSignInUp onClick={signIn}>Sign In</ButtonSignInUp>
        </div>
      </div>
    </div>
  );
}
