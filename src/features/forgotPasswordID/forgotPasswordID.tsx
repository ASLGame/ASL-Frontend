import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import Loader from "../../components/Loader/Loader";
import jwt_decode, { JwtPayload } from "jwt-decode";
import styles from "./forgotPassword.module.css";
import {
  getForgotPasswordAsync,
  resetPasswordAsync,
  selectForgotPassword,
  setIdExist,
  setResetPassword,
} from "./forgotPasswordSliceID";
import { selectSignIn, signOut } from "../signin/signinSlice";

export default function ForgotPassword() {
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const id = useParams().id;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const forgotPassword = useSelector(selectForgotPassword);
  const auth = useSelector(selectSignIn);
  const { resetPassword, resetPasswordState, idExist, idExistState } =
    forgotPassword;

  const passwordNotMatchNotification = () => {
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
          <h3>Password does not match</h3>
          <p>Please re-enter password.</p>
        </div>
      </div>
    );
  };

  const passwordValidationNotification = (text: string[]) => {
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
          <h3>Password is not strong enough</h3>
          {text && text.map((txt, index) => <p key={index}>{txt}</p>)}
        </div>
      </div>
    );
  };

  const tokenOutdatedNotification = () => {
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
          <h3>Token is Invalid or Outdated</h3>
          <p>Please generate a new link to reset password.</p>
        </div>
      </div>
    );
  };

  const passwordResetSuccessNotification = () => {
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
          <h3>Password succesfully reset</h3>
          <p>You may now login.</p>
        </div>
      </div>
    );
  };

  const validatePassword = () => {
    let text: string[] = [];
    let index = 1;

    if (password.length < 8) {
      text.push(`${index++}. Password should be longer than 8 characters.`);
    }
    if (!password.match("[A-Z]")) {
      text.push(
        `${index++}. Password should should contain at least one capital letter.`
      );
    }
    if (!password.match("[a-z]")) {
      text.push(
        `${index++}. Password should should contain at least one lowercase letter.`
      );
    }
    if (!password.match("[0-9]")) {
      text.push(
        `${index++}. Password should should contain at least one number.`
      );
    }
    if (!password.match("[@#$%^&*()!?+-.*&%]")) {
      text.push(
        `${index++}. Password should should contain at least one special character.`
      );
    }
    if (text.length > 0) {
      Store.addNotification({
        content: passwordValidationNotification(text),
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 6000,
          pauseOnHover: true,
        },
      });
      return false;
    }
    return true;
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    if (!validatePassword()) {
      return;
    }
    if (password !== repassword) {
      Store.addNotification({
        content: passwordNotMatchNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          pauseOnHover: true,
        },
      });
      return;
    }
    dispatch(resetPasswordAsync({ id, password }));
  };

  useEffect(() => {
    if (id) {
      dispatch(getForgotPasswordAsync(id));
    }
    if (auth) {
      dispatch(signOut());
    }
  }, []);

  useEffect(() => {
    if (!resetPassword && resetPasswordState === "rejected") {
      Store.addNotification({
        content: tokenOutdatedNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          pauseOnHover: true,
        },
      });
      dispatch(
        setResetPassword({ resetPassword: false, resetPasswordState: "idle" })
      );
      navigate("/signin");
    }
    if (resetPassword && resetPasswordState === "idle") {
      Store.addNotification({
        content: passwordResetSuccessNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
          pauseOnHover: true,
        },
      });
      dispatch(
        setResetPassword({ resetPassword: false, resetPasswordState: "idle" })
      );
      navigate("/signin");
    }
  });

  useEffect(() => {
    if (!idExist && idExistState === "rejected") {
      dispatch(setIdExist({ idExist: false, idExistState: "idle" }));
      navigate("/signin");
    }
  });

  if (idExist && idExistState === "idle") {
    return (
      <div className={styles.container + " " + styles.background}>
        <div className={styles.signupBoxv2}>
          <div className={styles.heading}>
            <h1 className={styles.h1}>Reset Password</h1>
          </div>
          <form className={styles.form} onSubmit={submit}>
            <label className={styles.label}>Password</label>
            <input
              required
              className={styles.input}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className={styles.label}>Re-Enter Password</label>
            <input
              required
              className={styles.input}
              type="password"
              id="repassword"
              name="repassword"
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <div className={styles.link}>
              <p>
                <Link to="/signin">
                  Already have an account? <br /> Sign In
                </Link>
              </p>
            </div>
            <div className={styles.button_container}>
              <button type="submit" className={styles.signupButton}>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (!idExist && idExistState === "rejected") {
    return <p>ID is not valid</p>;
  } else {
    return <Loader />;
  }
}
