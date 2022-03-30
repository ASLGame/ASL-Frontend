import { useAppSelector } from "../../../../../../app/hooks";
import { selectNewScores, selectScores } from "../../../../profileSlice";
import styles from "./scores.module.css";

export function Scores() {
  const scores = useAppSelector(selectScores);
  const newScores = useAppSelector(selectNewScores);

  const renderScores = () => {
    return scores!.map((score) => {
      return (
        <div className={styles.score_container}>
          <div key={score.id} className={styles.scores}>
            <div className={styles.icon}></div>
            <div className={styles.attributes_name}>{score.name}</div>
            <div className={styles.attributes_score}>{score.score}</div>
            <div className={styles.attributes_date}>
              {new Date(score.date_achieved).toLocaleDateString()}
            </div>
          </div>
          <div className={styles.line} />
        </div>
      );
    });
  };

  if (newScores !== "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.line} />
        {renderScores()}
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}
