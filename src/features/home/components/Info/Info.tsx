import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { selectSignIn } from "../../../signin/signinSlice";
import styles from "./Info.module.css";

export default function Info() {
  const isAuth = useAppSelector(selectSignIn);
  const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.mission}>Mission</h1>
      <p className={styles.paragraph}>
        Learn the basics of ASL, all while
        having fun and competing with other users.
      </p>
      {!isAuth && (
        <div className={styles.signUpMenu}>
          <p className={styles.paragraph}>Want to have fun and learn?</p>
          <button className={styles.button} onClick={() => navigate("/games")}>
            PLAY!
          </button>
          {/* <p className={styles.paragraph}>or</p>
          <button className={styles.button} onClick={() => navigate("/signup")}>
            Sign Up
          </button> */}
        </div>
      )}
    </>
  );
}
