import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../app/hooks";
import { selectSignIn } from "../../../signin/signinSlice";
import styles from "./Info.module.css";
import Typography from "@mui/material/Typography";
import { isMobile } from "react-device-detect";

export default function Info() {
  const isAuth = useAppSelector(selectSignIn);
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          style={{ width: isMobile ? "100%" : "75%" }}
          alt="hint..."
          src="https://signy-asl-models.s3.amazonaws.com/alphabet/alphabet-transparent.png"
        />
      </div>
    </div>
  );

  // return (
  //   <div className={styles.container}>
  //     <h1 className={styles.mission}>Mission</h1>
  //     <p className={styles.paragraph}>
  //       Learn the basics of ASL, all while
  //       having fun.
  //     </p>
  //     {!isAuth && (
  //       <div className={styles.signUpMenu}>
  //         <p className={styles.paragraph}>Want to have fun and learn?</p>
  //         <button className={styles.button} onClick={() => navigate("/handSigns")}>
  //           START!
  //         </button>
  //         <p className={styles.paragraph}>or</p>
  //         <button className={styles.button} onClick={() => navigate("/signup")}>
  //           Sign Up
  //         </button>
  //       </div>
  //     )}
  //   </div>
  //);
}
