import styles from "./leaderboard.module.css"
import { ByGames } from "./components/GamesTable"
import { ByTime } from "./components/TimeTable";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { getscoresAsync } from "./leaderboardSlice";

export function Leaderboard(){
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getscoresAsync());
    }, [])

    return(
        <div>
            <h1>Leaderboards</h1>
            <div className={styles.tables}>
                <ByGames />
                <ByTime />
            </div>
        </div>
        
    )
}