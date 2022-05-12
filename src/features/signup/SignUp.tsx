import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import { BackButton } from "../../components/Button.styled";
import {
  selectSignIn,
  selectSignInLoading,
  setLoading,
  signupAsync,
} from "../signin/signinSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Store } from "react-notifications-component";

export default function SignUp() {
  const [formPhase, setFormPhase] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [dob, setDob] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const auth = useAppSelector(selectSignIn);
  const signUpLoading = useAppSelector(selectSignInLoading);

  const today = new Date(Date.now());
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const dateFormatted = `${yyyy}-${mm}-${dd}`;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  let content;

  function signUpErrorNotification() {
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
          <h3>Sign Up Error</h3>
          <p>Account already exists.</p>
        </div>
      </div>
    );
  }

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

  const nextPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormPhase(true);
  };

  const submitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        },
      });
      return;
    }
    setIsDisabled(true);
    dispatch(
      signupAsync({
        first_name: firstname,
        last_name: lastname,
        password: password,
        username: username,
        email: email,
        DOB: dob,
        role: "User",
      })
    );
  };

  useEffect(() => {
    setIsDisabled(false);
  }, [username, password, repassword, email]);

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
    if (signUpLoading === "rejected") {
      Store.addNotification({
        content: signUpErrorNotification,
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
  }, [auth, navigate, dispatch, signUpLoading]);

  if (formPhase) {
    content = (
      <div className={styles.container + " " + styles.background}>
        <div className={styles.signupBoxv2}>
          <div className={styles.heading}>
            <BackButton onClick={() => setFormPhase(false)}>&#8249;</BackButton>
            <h1 className={styles.h1}>Sign Up</h1>
          </div>
          <form className={styles.form} onSubmit={submitSignUp}>
            <label className={styles.label}>Username</label>
            <input
              required
              className={styles.input}
              type="text"
              id="username"
              name="username"
              value={username}
              pattern="^(?!.*[-_.]{2,})(?=^[^-_.].*[^-_.]$)[\w.\s-]{3,9}$"
              title="Must only contain letters, numbers or non-sequential special characters(. _ -)."
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
            <label className={styles.label}>Email</label>
            <input
              required
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
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
              <button
                disabled={isDisabled}
                type="submit"
                className={styles.signupButton}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={styles.container + " " + styles.background}>
        <div className={styles.signupBox}>
          <div className={styles.heading}>
            <h1 className={styles.h1}>Sign Up</h1>
          </div>
          <form className={styles.form} onSubmit={nextPage}>
            <label className={styles.label}>First Name</label>
            <input
              required
              className={styles.input}
              type="text"
              id="firstname"
              name="firstname"
              value={firstname}
              title="Must only contain letters and space."
              pattern="[a-zA-Z ]+"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label className={styles.label}>Last Name</label>
            <input
              required
              className={styles.input}
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              pattern="[a-zA-Z ]+"
              title="Must only contain letters and space."
              onChange={(e) => setLastname(e.target.value)}
            />
            <label className={styles.label}>Date of Birth</label>
            <input
              required
              className={styles.input}
              type="date"
              id="dob"
              name="dob"
              value={dob}
              max={dateFormatted}
              onChange={(e) => setDob(e.target.value)}
            />
            <div className={styles.link}>
              <a>
                <Link to="/signin">
                  Already have an account? <br /> Sign In
                </Link>
              </a>
            </div>
            <div className={styles.button_container}>
              <button className={styles.signupButton} type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return <div>{content}</div>;
}
