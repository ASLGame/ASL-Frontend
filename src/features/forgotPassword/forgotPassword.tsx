import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  initForgotPasswordAsync,
  selectForgotPassword,
  setEmailSent,
} from "../forgotPasswordID/forgotPasswordSliceID";

import styles from "./forgotPassword.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { emailSent, emailSentState } = useSelector(selectForgotPassword);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(initForgotPasswordAsync(email));
  };

  const emailNotFoundNotification = () => {
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
          <h3>Email is not registered</h3>
          <p>Please re-enter email.</p>
        </div>
      </div>
    );
  };

  const emailSentNotification = () => {
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
          <h3>Email sent</h3>
          <p>Please check inbox.</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!emailSent && emailSentState === "rejected") {
      Store.addNotification({
        content: emailNotFoundNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
      dispatch(setEmailSent({ emailSent: false, emailSentState: "idle" }));
    }
    if (emailSent && emailSentState === "idle") {
      Store.addNotification({
        content: emailSentNotification,
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000,
        },
      });
      dispatch(setEmailSent({ emailSent: false, emailSentState: "idle" }));
    }
  }, [emailSent, emailSentState, dispatch]);

  return (
    <div className={styles.container + " " + styles.background}>
      <div className={styles.signupBoxv2}>
        <div className={styles.heading}>
          <h1 className={styles.h1}>Enter Email</h1>
          <p style={{ textAlign: "center", marginBottom: "3rem" }}>
            Check email for a link to reset password. It may take up to 5
            minutes.
          </p>
        </div>
        <form className={styles.form} onSubmit={submit}>
          <label className={styles.label}>Email</label>
          <input
            required
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
