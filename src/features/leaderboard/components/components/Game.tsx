import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"; 
import { selectScores, scoreState, bygamesAsync } from "../../leaderboardSlice";
import styles from "../GamesTable.module.css"

export function Game(props:any){
  const gid = props.gid;
  console.log("It starts", gid, props)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(bygamesAsync(gid));
  }, []);
  const scores = useAppSelector(selectScores);
  console.log(scores)
  const state = useAppSelector(scoreState);
  let counter = 0;

  const allscores = () => {
      return scores!.map((score) => {
          return (
            <div key={score.id} style={{width: "100%"}} >
              <div className={styles.row}>
                <p>{counter += 1}. {score.username}</p>
                <p>{new Date(score.date_achieved).toLocaleDateString()}</p>
                <p>{score.score}</p>
              </div>
            </div>
          );
        });
      };
      if (state !== "loading") {
          return (
            <div style={{width: "100%"}}>
              <div className={styles.row}>
                <p>User</p>
                <p>Date Achieved</p>
                <p>Score</p>
              </div>
             {allscores()}
            </div>
          );
        } else {
          return <p>Loading...</p>
        }
}