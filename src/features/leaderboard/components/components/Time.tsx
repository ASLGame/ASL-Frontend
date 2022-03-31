import { useAppDispatch, useAppSelector } from "../../../../app/hooks"; 
import { selectScores, scoreState } from "../../leaderboardSlice";
import styles from "../GamesTable.module.css"


export function Today(){
    const scores = useAppSelector(selectScores);
    const state = useAppSelector(scoreState);
    let counter = 0;

    const allscores = () => {
        return scores!.map((score) => {
          if(new Date(score.date_achieved).toLocaleDateString() === new Date(Date.now()).toLocaleDateString()){
            return (
              <div key={score.id} style={{width: "100%"}}>
                <div className={styles.row}>
                  <p>{counter += 1}. {score.username}</p>
                  <p>{score.name}</p>
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
                  <p>Game</p>
                  <p>Score</p>
                </div>
               {allscores()}
              </div>
            );
          } else {
            return <p>Loading...</p>
          }
}

export function Yesterday(){
    const scores = useAppSelector(selectScores);
    const state = useAppSelector(scoreState);
    let counter = 0;

    const allscores = () => {
        return scores!.map((score) => {
          if(new Date(score.date_achieved).toLocaleDateString() === new Date(Date.now()-86400000).toLocaleDateString()){
            return (
              <div key={score.id} style={{width: "100%"}} >
                <div className={styles.row}>
                  <p>{counter += 1}. {score.username}</p>
                  <p>{score.name}</p>
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
                  <p>Game</p>
                  <p>Score</p>
                </div>
               {allscores()}
              </div>
            );
          } else {
            return <p>Loading...</p>
          }
}

export function Weekly(){
    const scores = useAppSelector(selectScores);
    const state = useAppSelector(scoreState);
    let counter = 0;

    const allscores = () => {
        return scores!.map((score) => {
          if(new Date(score.date_achieved).toLocaleDateString() >= new Date(Date.now()-604800000).toLocaleDateString() && new Date(score.date_achieved).toLocaleDateString() <= new Date(Date.now()).toLocaleDateString()){
            return (
              <div key={score.id} style={{width: "100%"}} >
                <div className={styles.row}>
                  <p>{counter += 1}. {score.username}</p>
                  <p>{score.name}</p>
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
                  <p>Game</p>
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