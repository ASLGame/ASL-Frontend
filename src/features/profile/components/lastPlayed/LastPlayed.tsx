import { useAppSelector } from "../../../../app/hooks";
import { selectLatestPlayed, selectNewLatestPlayed } from "../../profileSlice";
import styles from "./lastPlayed.module.css";

export function LastPlayed() {
  const latestPlayed = useAppSelector(selectLatestPlayed);
  const newlatestPlayed = useAppSelector(selectNewLatestPlayed);

  const renderLatestPlayed = () => {
    return latestPlayed!.map((game) => {
      return (
        <div key={game.id} className={styles.games}>
            <div className={styles.icon}></div>
          <div className={styles.attributes}>{game.name}</div>
          <div className={styles.attributes}>{game.score}</div>
        </div>
      );
    });
  };

  if (newlatestPlayed !== "loading") {
    return (
      <div className={styles.container}>
       {renderLatestPlayed()}
      </div>
    );
  } else {
    return <p>Loading...</p>
  }
  
}
