import styles from "./leaderboard.module.css";
import { ByGames } from "./components/GamesTable";
import { ByTime } from "./components/TimeTable";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  getscoresAsync,
  gettodayAsync,
  getweeklyAsync,
  getyesterdayAsync,
} from "./leaderboardSlice";
import { getAllGamesAsync } from "../games/gamesSlice";

export default function Leaderboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllGamesAsync());
    dispatch(getyesterdayAsync());
    dispatch(gettodayAsync());
    dispatch(getweeklyAsync());
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Leaderboards</h1>
      <div className={styles.tables}>
        <ByGames />
        <ByTime />
      </div>
    </div>
  );
}
