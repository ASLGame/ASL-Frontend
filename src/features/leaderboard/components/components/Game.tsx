import { useAppDispatch, useAppSelector } from "../../../../app/hooks"; 
import { selectScores, scoreState } from "../../leaderboardSlice";
import styles from "../GamesTable.module.css"

export function Game(props:any){
  const gid = props.gid;
  console.log("It starts", gid, props)
  const scores = useAppSelector(selectScores);
  const state = useAppSelector(scoreState);
  let counter = 0;

  const allscores = () => {
      return scores!.map((score) => {
        if(score.game_id === gid){
          return (
            <div key={score.id} style={{width: "100%"}} >
              <div className={styles.row}>
                <p>{counter += 1}. {score.username}</p>
                <p>{new Date(score.date_achieved).toLocaleDateString()}</p>
                <p>{score.score}</p>
              </div>
            </div>
          )}else{
            return (
              <></>
            )
          };
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