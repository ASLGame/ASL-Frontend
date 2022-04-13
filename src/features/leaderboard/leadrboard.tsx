import styles from "./leaderboard.module.css";
import { ByGames } from "./components/GamesTable";
import { ByTime } from "./components/TimeTable";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getscoresAsync, gettodayAsync, getweeklyAsync, getyesterdayAsync } from "./leaderboardSlice";
import { getAllGamesAsync } from "../games/gamesSlice";

export function Leaderboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getscoresAsync());
    dispatch(getAllGamesAsync());
    dispatch(getyesterdayAsync());
    dispatch(gettodayAsync());
    dispatch(getweeklyAsync());
  }, []);

  return (
    <div>
      <h1>Leaderboards</h1>
      <div className={styles.tables}>
        <div className={styles.right}>
          <ByGames />
        </div>
        <div className={styles.left}>
          <ByTime />
        </div>
      </div>
    </div>
  );
}
