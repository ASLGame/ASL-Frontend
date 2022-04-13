import React, { FunctionComponent, useEffect } from "react";
import styles from "./home.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNewestGameAsync, getFeaturedGamesAsync } from "./homeSlice";
import NewGame from "./components/NewestGame/newestGame";
import { Button } from "../../components/Button.styled";
import { useNavigate } from "react-router-dom";
import FeaturedGames from "./components/FeaturedGames/featuredGames";
import { selectSignIn } from "../signin/signinSlice";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectSignIn);

  useEffect(() => {
    dispatch(getNewestGameAsync());
    dispatch(getFeaturedGamesAsync());
  }, [dispatch]);

  return (
    <>
      <section className={styles.container + " " + styles.background}>
        <div className={styles.top}>
          <div className={styles.left}>
            <NewGame />
          </div>
          <div className={styles.right}>
            <FeaturedGames />
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <h1>Mission</h1>
            <p className={styles.paragraph}>
              Teach the basics of ASL and spread awareness of the community, all
              while having fun and competing with other users.
            </p>
          </div>
          {!isAuth ? (
            <div className={styles.right}>
              <p> Want to have fun and learn?</p>
              <Button
                style={{ width: "30%", height: "15%", minWidth: "100px" }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
              <p>or</p>
              <Button
                style={{ width: "30%", height: "15%", minWidth: "100px" }}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
