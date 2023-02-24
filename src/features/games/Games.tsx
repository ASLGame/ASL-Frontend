import { FunctionComponent, useEffect, useState } from "react";
import styles from "./Games.module.css";
import GameTiles from "./component/GameTiles";
import {
  getAllGamesAsync,
  changeSearchText,
  selectSearchText,
} from "./gamesSlice";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";

interface GamesProps { }

const Games: FunctionComponent<GamesProps> = () => {
  const dispatch = useAppDispatch();
  const searchText = useSelector(selectSearchText);

  useEffect(() => {
    dispatch(getAllGamesAsync());
  }, [dispatch]);

  return (
    <div className={styles.containerOuter}>
      {/* <div className={styles.searchContainer}>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              id="search"
              name="search"
              defaultValue={searchText}
              onChange={(e) => dispatch(changeSearchText(e.target.value))}
            />
            <input
              type="text"
              name="StackOverflow1370021"
              defaultValue="Fix one form bug"
              style={{ display: "none" }}
              onChange={() => {
                console.log("Nice find!");
              }}
            />
            <i className={styles.icon} />
          </div>
        </form>
      </div> */}
      <div className={styles.containerInner}>
        <div className={styles.gamesContainer}>
          <GameTiles />
        </div>
      </div>
    </div>
  );
};

export default Games;
