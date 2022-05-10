import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import styles from "./forgotPassword.module.css";

export default function ForgotPassword() {
  const [password, setPassword] = useState<string>("");
  const [repassword, setRepassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      //   Store.addNotification({
      //     content: passwordValidationNotification(text),
      //     insert: "top",
      //     container: "top-right",
      //     animationIn: ["animated", "fadeIn"],
      //     animationOut: ["animated", "fadeOut"],
      //     dismiss: {
      //       duration: 6000,
      //       pauseOnHover: true,
      //     },
      //   });
      return false;
    }
    return true;
  };

  return (
    <div className={styles.container + " " + styles.background}>
      <div className={styles.signupBoxv2}>
        <div className={styles.heading}>
          <h1 className={styles.h1}>Reset Password</h1>
        </div>
        <form className={styles.form}>
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
            <a>
              <Link to="/signin">
                Already have an account? <br /> Sign In
              </Link>
            </a>
          </div>
          <div className={styles.button_container}>
            <button type="submit" className={styles.signupButton}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
