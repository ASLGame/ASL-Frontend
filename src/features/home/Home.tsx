import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getFeaturedGamesAsync, getNewestGameAsync } from "./homeSlice";

import styles from "./home.module.css";
import NewestGame from "./components/NewestGame/newestGame";
import FeaturedGameList from "./components/FeaturedGameList/FeaturedGameList";
import Info from "./components/Info/Info";

export default function Home2() {
  const dispatch = useAppDispatch();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  console.log(height);

  useEffect(() => {
    dispatch(getNewestGameAsync());
    dispatch(getFeaturedGamesAsync());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
  });

  return (
    <>
      {width > 800 ? (
        height > 1100 ? (
          <div className={styles.bigContainer}>
            <div className={styles.left}>
              <h1>Newest Games</h1>
              <NewestGame />
              <FeaturedGameList />
            </div>
            <div className={styles.right}>
              <Info />
            </div>
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.left}>
              <h1>Newest Games</h1>
              <NewestGame />
              <FeaturedGameList />
            </div>
            <div className={styles.right}>
              <Info />
            </div>
          </div>
        )
      ) : (
        <div className={styles.home}>
          <h1>Newest Games</h1>
          <NewestGame />
          <FeaturedGameList />
          <Info />
        </div>
      )}
    </>
  );
}
